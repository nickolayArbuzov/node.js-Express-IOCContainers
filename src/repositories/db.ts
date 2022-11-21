import {MongoClient} from 'mongodb'
import "dotenv/config";
import { PostType, BlogType, UserInputType, CommentType} from '../types';

const mongoURI = process.env.MONGO_URL || "";

export const client = new MongoClient(mongoURI);
export const blogCollection = client.db("ht_08").collection<BlogType>("blogs",);
export const postCollection = client.db("ht_08").collection<PostType>("posts");
export const userCollection = client.db("ht_08").collection<UserInputType>("users");
export const commentCollection = client.db("ht_08").collection<CommentType>("comments");
export const jwtCollection = client.db("ht_08").collection("jwt");
export const logCollection = client.db("ht_08").collection("logs");

export async function runDb(){
    try {
        await client.connect();
        await client.db("back").command({ping:1})
    }
    catch{
        await client.close()
    }
}

