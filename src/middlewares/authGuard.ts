import {NextFunction, Request, Response} from "express";
import {userService} from "../domain/user-service";

export const authGuard = async (req:Request, res:Response, next:NextFunction)=>
{
    const header = req.header('Authorization')
    if(!header){
        res.send(401)
        return
    }
    const matchArr = header.match(/^Basic (.*)$/)
    if(!matchArr){
        res.send(401)
        return
    }
    const [login, passwd] = Buffer.from(matchArr[1], 'base64').toString().split(':');
    /*const check = await userService.checkCredentials(login, passwd)
    console.log("logopass = " + login +" -> "+passwd  )
    console.log(check)
    if(!check){
        res.send(401); return;
    }
    next();*/

    if (login === 'admin' && passwd==='qwerty') {
        next();
    }
    else{
        res.send(401)
        return
    }
}