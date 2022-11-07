import {MongoClient} from 'mongodb'
import {blogType, postType} from "../types";
import "dotenv/config";

const mongoURI = process.env.MONGO_URL || "";

export const client = new MongoClient(mongoURI);
export const blogCollection = client.db("ht_03").collection<blogType>("blogs");
export const postCollection = client.db("ht_03").collection<postType>("posts");
export const userCollection = client.db("ht_03").collection("users");
export const commentsCollection = client.db("ht_03").collection("comments");

export async function runDb(){
    try {
        await client.connect();
        await client.db("back").command({ping:1})
    }
    catch{
        await client.close()
    }
}

