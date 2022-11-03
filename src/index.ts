import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videoRouter} from "./controllers/video-router";
import { runDb } from './infrastructure/db';

dotenv.config()

const port = process.env.PORT || 7777
export const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/videos', videoRouter) 

app.get('/', (req: Request, res: Response) => {
    res.send({message: 'Inversify+'})
})

const startServer = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

startServer()