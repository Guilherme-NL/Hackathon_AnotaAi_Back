import joi from "joi";

export const addNotesSchema = joi.object({
  title: joi.string().min(5).required(),
  description: joi.string().min(20).required(),
  date: joi.required(),
});

  