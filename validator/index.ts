import { validationResult } from "express-validator";

export const validator = validationResult.withDefaults({
  formatter: (error) => error.msg,
});
