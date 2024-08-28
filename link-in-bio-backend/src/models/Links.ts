import { Schema, model, Document } from 'mongoose';

export interface ILink {
  originalUrl: string;
  parameters: string;
  newUrl: string;
  //createdAt: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    originalUrl: { type: String, required: true },
    parameters: { type: String, required: true },
    newUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export interface ILinkResponse {
    link: ILink;
    warning?: string;
  }  

export const LinkModel = model<ILink>('Link', LinkSchema);
