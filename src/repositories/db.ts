import {MongoClient, ObjectId} from 'mongodb'
import "dotenv/config";
import { PostType, BlogType, UserInputType, CommentType, DeviceType, LikeType} from '../types';

const mongoURI = process.env.MONGO_URL || "";

export const client = new MongoClient(mongoURI);
export const blogCollection = client.db("ht-08").collection<BlogType>("blogs",);
export const postCollection = client.db("ht-08").collection<PostType>("posts");
export const userCollection = client.db("ht-08").collection<UserInputType>("users");
export const commentCollection = client.db("ht-08").collection<CommentType>("comments");
export const devicesCollection = client.db("ht-08").collection<DeviceType>("devices")
export const likesCollection = client.db("ht-08").collection<LikeType>("likes")
export const logCollection = client.db("ht-08").collection("logs");

export async function runDb(){
    try {
        await client.connect();
        await client.db("back").command({ping:1})
    }
    catch{
        await client.close()
    }
}

