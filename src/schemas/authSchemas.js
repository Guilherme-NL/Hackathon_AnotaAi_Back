import Joi from "joi";

export const registrationDataSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string()
      .min(5)
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
    password: Joi.string().min(8).required(),
    confirmedPassword: Joi.string().min(8).required(),
  });

  export const userDataSchema = Joi.object({
    email: Joi.string()
      .min(5)
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required(),
    password: Joi.string().min(8).required(),
  });

  export const entrySchema = Joi.object({
    email: Joi.string().min(1).required(),
    type: Joi.string().min(1).required(),
    value: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
  });

  export const tokenSchema = Joi.string().required().min(1);