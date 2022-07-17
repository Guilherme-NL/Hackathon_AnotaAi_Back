import { userDataSchema } from "./../schemas/authSchemas.js";

export default function validateUserDataFormat(user) {
    let validationResult = userDataSchema.validate(user).error === undefined;
    let isValid;
    if (validationResult) {
      isValid = true;
      return isValid;
    } else {
      isValid = false;
      return isValid;
    }
  }