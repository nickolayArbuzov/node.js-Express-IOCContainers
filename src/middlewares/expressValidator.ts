import {Request, Response, NextFunction} from 'express'
import { validationResult, body } from 'express-validator'

export const loginValidation = body('login').trim().isLength({min: 1}).withMessage('incorrect Login')
export const emailValidation = body('email').trim().isLength({min: 1}).withMessage('incorrect Email')


export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    } else {
        next()
    }
}