import { LinkModel, ILink ,ILinkResponse } from '../models/Links';
import { UrlHelper } from '../utils/urlHelper';
import Redis from 'ioredis';
import axios from 'axios';

// Initilize the redis Client.
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,  // This ensures the port is a number
});

// This service class is responsible for the business logic.
export class LinkService {
  // Below method to append parameters to a URL, validate the new URL, and save it to the database
  static async appendParameters(url: string, parameters: string): Promise<ILinkResponse> {
    const newUrl = UrlHelper.appendParameters(url, parameters);
    const link = new LinkModel({ originalUrl: url, parameters, newUrl });
        let warningMessage: string | undefined;
        try {
          const response = await axios.get(newUrl);
          // Below is the additional valiadation for the newURL, If it is accessible or not.
          // To give a [warning message] status of the newly formed URL to the user. 
          if (response.status !== 200) {
            warningMessage = 'The new URL is not returning a 200 status code and may not be ready for use.';
          } else {
            warningMessage = 'The new URL is returning a 200 status code and may ready for use.';
          }
        } catch (error) {
          warningMessage = 'The new URL is not accessible or is returning an error.';
        }
     const savedLink = await link.save();
      // Invalidate Redis cache to ensure, requests fetch fresh data with newly added entry.
     await redisClient.del(`links:*`); 
     return {
     link: {
      originalUrl: savedLink.originalUrl,
      parameters: savedLink.parameters,
      newUrl: savedLink.newUrl,
    },
    warning: warningMessage,
  };
  }
// Method to retrieve links from the database with pagination, using Redis for caching.
  static async getLinks(page: number, limit: number): Promise<{ data: ILink[]; total: number }> {
    const cacheKey = `links:${page}:${limit}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // return the cached data, if avaialble.
      return JSON.parse(cachedData); 
    }
     
    const skip = (page - 1) * limit;
    // Fetch data from MongoDB.
    const data = await LinkModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    const total = await LinkModel.countDocuments().exec();

    const result = { data, total };
    await redisClient.setex(cacheKey, 60, JSON.stringify(result)); // Cache for 1 minutes

    return result;
  }
}
