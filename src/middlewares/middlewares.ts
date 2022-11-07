import {CustomValidator, query, body} from "express-validator";
import { blogsRepo } from "../repositories/blog-db-repo";

const isValidUrl: CustomValidator = value => {
    if(!/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(value)){
        throw new Error('Неверный URL!')
    }
    return true
};

const isBlogIdValid: CustomValidator = async value => {
    const flag = await blogsRepo.findBlogById(value)
    if (!flag) {
        throw new Error('Неверный BlogID')
    }
    return true
}

export const searchNameTermValidator = query('searchNameTerm').trim().isLength({min:1}).withMessage('Поле не должно быть пустым')
export const blogNameValidation = body('name')
                                .trim()
                                .isLength({min:1, max:15}).withMessage('Поле не должно быть пустым и не должно превышать 15 символов')

export const urlValidation =  body('youtubeUrl')
                                .custom(isValidUrl)
                                .isLength({min:1, max:100}).withMessage('Поле не должно быть пустым и не должно превышать 100 символов')

export const postTitleValidation = body('title')
                                        .trim()
                                        .isLength({min:1, max:30}).withMessage('Поле не должно быть пустым или быть больше 30 символов')

export const postShortDescrValidation = body('shortDescription')
                                        .trim()
                                        .isLength({min:1, max:100}).withMessage('Поле не должно быть пустым или быть больше 100 символов')

export const postContentValidation = body('content')
                                    .trim()
                                    .isLength({min:1, max:1000}).withMessage('Поле не должно быть пустым или быть больше 1000 символов')

export const postBlogIdValidation = body('blogId')
                                    .trim()
                                    .isLength({min:1, max:35}).withMessage('Поле должно быть строкой')
                                    .custom(isBlogIdValid)