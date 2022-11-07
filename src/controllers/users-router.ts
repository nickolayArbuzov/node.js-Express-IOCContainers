import { Router, Request, Response} from 'express';
import { usersCollection } from '../infrastructure/db';
import { emailValidation, inputValidationMiddleware, loginValidation } from '../middlewares/expressValidator';

export const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
    console.log('req.query', req.query)
    const count = await usersCollection.count({})
    const result = await usersCollection.find({}).limit(1).skip(1).project({_id: 0}).toArray()
    res.send(result)
});

usersRouter.post('/', loginValidation, emailValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const user = {
        id: req.body.id,
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
    }
    await usersCollection.insertOne(user)
    res.status(201).send(user)
});

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const result = await usersCollection.deleteOne({id: req.params.id})
    if (result.deletedCount > 0) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
    
});