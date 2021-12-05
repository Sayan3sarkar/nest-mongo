import * as Joi from 'joi';

export type CreatePostType = {
  title: string;
  content: string;
  creator: string;
};

export const CreatePostDTO = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  creator: Joi.string().required(),
}).required();

export type UpdatePostType = {
  title?: string;
  content?: string;
};

export const UpdatePostDTO = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
}).optional();
