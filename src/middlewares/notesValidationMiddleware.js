import { notesSchemas } from "../schemas/notesSchemas.js";

export async function notesSchemas(req, res, next) {
  const validation = notesSchemas.validate(req.body, { abortEarly: false });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(422);
  }

  next();
}
