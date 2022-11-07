import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videoRouter} from "./controllers/video-router";
import { blogsCollection, runDb, usersCollection, videoCollection } from './infrastructure/db';
import { authRouter } from './controllers/auth-router';
import { blogsRouter } from './controllers/blogs-router';
import { postsRouter } from './controllers/posts-router';
import { usersRouter } from './controllers/users-router';

dotenv.config()

const port = process.env.PORT || 7777
export const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRouter) 
app.use('/blogs', blogsRouter) 
app.use('/posts', postsRouter) 
app.use('/users', usersRouter) 
app.use('/videos', videoRouter) 
app.delete('/testing/all-data', async (req: Request, res: Response) => {
    console.log('test')
    await blogsCollection.deleteMany({})
    await videoCollection.deleteMany({})
    await usersCollection.deleteMany({})
    res.sendStatus(204)
}) 

app.get('/', (req: Request, res: Response) => {
    res.send({message: 'Inversify+'})
})

export const startServer = async () => {
    await runDb()
    return app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

startServer()