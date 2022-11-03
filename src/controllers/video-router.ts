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

let videos = [
    {id: 1, title: 'video'},
    {id: 2, title: 'video'},
    {id: 3, title: 'video'},
]

videoRouter.get('/', async (req: Request, res: Response) => {
    const result = await blogsCollection.find({}).toArray()
    res.send(result)
});