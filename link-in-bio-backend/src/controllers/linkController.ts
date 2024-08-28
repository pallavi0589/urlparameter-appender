import { Request, Response } from 'express';
import { LinkService } from '../services/linkService';

export class LinkController {
    // Controller for handling the appending of parameters to a URL.
  static async appendParameters(req: Request, res: Response): Promise<Response> {
    {
        const { url, parameters } = req.body;
        try {
            // Service call to append the parameters and save URL.
          const { link, warning } = await LinkService.appendParameters(url, parameters);
    
          return res.status(201).json({ //set the response status.
            link,
            warning,
          });
        } catch (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  }
// Controller for retrieving links with pagination.
  static async getLinks(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;
    try {
      const result = await LinkService.getLinks(Number(page), Number(limit));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
