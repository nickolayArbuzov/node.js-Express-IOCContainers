import {body} from "express-validator";

export const loginValidator = body('login').trim().isLength({min:3, max:10})

export const passwordValidator = body('password').trim().isLength({min:6, max:20})

export const emailVAlidator = body('email').isEmail()