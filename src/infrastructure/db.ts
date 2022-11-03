import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()

const mongoUri = process.env.MONGO_URL || ''

export const client = new MongoClient(mongoUri)
const db = client.db('blogs')
export const blogsCollection = db.collection('blogs')

export const runDb = async () => {
    try {
        await client.connect()
        await client.db('blogs').command({ping: 1})
        console.log('connect with mongo')
    } catch(e) {
        await client.close()
        console.log('error with mongo', e)
    }
}