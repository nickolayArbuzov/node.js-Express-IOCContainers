import {Router, Request, Response} from "express";
import {userService} from "../domain/user-service";
import {create} from "domain";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {emailVAlidator, loginValidator, passwordValidator} from "../middlewares/userMiddleware";
import {authGuard} from "../middlewares/authGuard";
import {
    pageNumberSanitizer,
    pageSizeSanitizer, searchEmailTermSanitizer, searchLoginTermSanitizer, searchNameTermSanitizer,
    sortBySanitizer,
    sortDirectionSanitizer
} from "../middlewares/sanitazers";

export const usersRouter = Router({})

usersRouter.get('/',searchLoginTermSanitizer,searchEmailTermSanitizer, pageNumberSanitizer, pageSizeSanitizer, sortBySanitizer,sortDirectionSanitizer,async (req:Request, res:Response) => {
    const {searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection} = req.query;
    const users = await userService.getUsers(searchLoginTerm, searchEmailTerm,+pageNumber!, +pageSize!, sortBy, sortDirection);
    res.status(200).send(users);
})
usersRouter.post('/',authGuard,loginValidator, passwordValidator, emailVAlidator, inputValidationMiddleware, async (req:Request, res:Response) => {
    const {login, password, email} = req.body
    const createdUser = await userService.createUser(login, password, email);
    res.status(201).send(createdUser)
})
usersRouter.delete('/:id',authGuard, inputValidationMiddleware, async (req:Request, res:Response) => {
    const {id} = req.params;
    const isDeleted = await userService.deleteUser(id)
    isDeleted ? res.send(204) : res.send(404)
})