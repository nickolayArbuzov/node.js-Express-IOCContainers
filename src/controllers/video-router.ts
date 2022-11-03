import { Router, Request, Response} from 'express';
import { blogsCollection } from '../infrastructure/db';

export const videoRouter = Router();

class Video {
    constructor () {

    }
    findAll (req: Request, res: Response) {
        res.send([])
    }
}

videoRouter.get('/', async (req: Request, res: Response) => {
    const result = await blogsCollection.find({}).toArray()
    res.send(result)
});