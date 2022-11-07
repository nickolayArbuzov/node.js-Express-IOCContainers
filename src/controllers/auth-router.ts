import { Router, Request, Response} from 'express';
import { usersCollection } from '../infrastructure/db';
import { emailValidation, inputValidationMiddleware, loginValidation } from '../middlewares/expressValidator';

export const authRouter = Router();

authRouter.post('/login', loginValidation, emailValidation, inputValidationMiddleware, async (req: Request, res: Response) => {

    const auth = await usersCollection.findOne({
        $and: [
            {'login': req.body.login},
            {'password': req.body.password}
        ]
    })
    if (!auth) {
        res.sendStatus(401)
    }
    res.sendStatus(204)
});
