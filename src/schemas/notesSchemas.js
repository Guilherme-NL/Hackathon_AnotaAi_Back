import joi from "joi";

export const addNotesSchema = joi.object({
  description: joi.string().min(20).required(),
});
