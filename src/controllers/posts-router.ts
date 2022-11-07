import { Router, Request, Response} from 'express';
import { blogsCollection } from '../infrastructure/db';
import { validMiddleware } from '../middlewares/checkValidVideo';

export const postsRouter = Router();

postsRouter.get('/', async (req: Request, res: Response) => {
    const result = await blogsCollection.find({}).project({_id: 0}).toArray()
    res.send(result)
});

postsRouter.post('/', validMiddleware, async (req: Request, res: Response) => {
    const video = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    }
    await blogsCollection.insertOne(video)
    res.status(201).send(video)
});

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const result = await blogsCollection.find({id: req.params.id}).project({_id: 0}).toArray()
    if(result.length > 0) {
        res.send(result)
    }
    else res.sendStatus(404)
});

postsRouter.put('/:id', validMiddleware, async (req: Request, res: Response) => {
    const result = await blogsCollection.updateOne({id: req.params.id}, {$set: req.body})
    if (result.matchedCount > 0) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
});

postsRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await blogsCollection.deleteOne({id: req.params.id})
    if (result.deletedCount > 0) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
    
});