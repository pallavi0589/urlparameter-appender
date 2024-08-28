import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

// Define the appendParameters Schema for url and parameter values.
export const appendParametersSchema = Joi.object({
  url: Joi.string().uri().required(),
  parameters: Joi.string().required(),
});

// Define the getLinks Schema for page and limit values.
export const getLinksSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// A generic validation middleware method, 
// to validate incoming HTTP requests to ensure that they meet the expected format.
export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({ ...req.body, ...req.query }, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

