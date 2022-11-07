import {Request, Response, Router} from "express";
import {authGuard} from "../middlewares/authGuard";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {
    postBlogIdValidation,
    postContentValidation,
    postShortDescrValidation,
    postTitleValidation
} from "../middlewares/middlewares";
import {postService} from "../domain/post-service";
import {
    pageNumberSanitizer,
    pageSizeSanitizer,
    sortBySanitizer,
    sortDirectionSanitizer
} from "../middlewares/sanitazers";
import {body} from "express-validator";
import {authMiddleware} from "../middlewares/authMiddleware";

export const postsRouter = Router({})

postsRouter.get('/', pageNumberSanitizer, pageSizeSanitizer, sortBySanitizer,sortDirectionSanitizer, async (req: Request, res: Response) => {
    console.log(req.query)
    const data = await postService.findAllPosts(+req.query.pageNumber!, +req.query.pageSize!,req.query.sortBy,req.query.sortDirection);
    res.status(200).send(data);
})
postsRouter.post('/', authGuard, postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware, async (req: Request, res: Response) => {
    const post = await postService.createPost(req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId,
        req.body.blogId);
    post ? res.status(201).send(post) : res.send(404)
})
postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post = await postService.findPostById(req.params.id);
    post ? res.status(200).send(post) : res.send(404)
})
postsRouter.put('/:id', authGuard, postTitleValidation,postShortDescrValidation, postContentValidation, postBlogIdValidation,inputValidationMiddleware,async (req: Request, res: Response) => {
    const isUpdated = await postService.updatePost(
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId)

    isUpdated ? res.send(204) : res.send(404)
})
postsRouter.delete('/:id', authGuard,async (req: Request, res: Response) => {
    const isDeleted = await postService.deletePost(req.params.id);
    isDeleted ? res.send(204) : res.send(404);
})
