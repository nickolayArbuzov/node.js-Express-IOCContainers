import {Router,Request, Response} from "express";
import {userService} from "../domain/user-service";
import {body} from "express-validator";
import {jwtService} from "../application/jwt-service";
import { inputValidationMiddleware } from "../middlewares/inputValidationMiddleware";

export const authRouter = Router({})

authRouter.post('/login', body('login').trim().isLength({min:1}),body('password').trim().isLength({min:1}) , inputValidationMiddleware, async (req:Request, res:Response)=>{
    const user = await userService.checkCredentials(req.body.login, req.body.password)
    if(!user){
        res.send(401)
        return
    }
    const token = await jwtService.createJwt(user)
    console.log(token)
    res.status(204).send(token)
})