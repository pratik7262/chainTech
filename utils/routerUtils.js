import { body } from "express-validator";

export const signUpRules = [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Enter a password of minimum 8 characters").isLength({
    min: 8,
  }),
];

export const signInRules = [
  body("email", "Enter A Valid Email").isEmail(),
  body("password", "Enter A Password").exists(),
];

export const taskRules = [
  body("title", "Please Enter Task Title").exists().isLength({ min: 1 }),
];

export const handleErrors = (res, statusCode, message, success = false) => {
  return res.status(statusCode).json({ message, success });
};

export const isValidDateFormat = (dateString) => {
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return dateRegex.test(dateString);
};
