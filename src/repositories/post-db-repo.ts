import {blogCollection, postCollection} from "./db";
import {postType} from "../types";
import {ObjectId} from "mongodb";

export const postRepo = {
    async findAllPosts(pageNumber:number,pageSize:number, sortBy:string, sortDirection:any){
        console.log("PN "+pageNumber)
        console.log("PS " + pageSize)

        const posts = await postCollection.find({}).skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort( {[sortBy] : sortDirection} )
            .toArray();
        const temp = posts.map((post) => {
            //@ts-ignore
            delete Object.assign(post, {["id"]: post["_id"] })["_id"];
            return post
        })
        const totalCount = await postCollection.countDocuments();
        console.log(pageSize)
        const outputObj = {
            pagesCount:Math.ceil(totalCount/pageSize),
            page:pageNumber,
            pageSize:pageSize,
            totalCount:totalCount,
            items:temp
        }
        return outputObj

    },
    async findPostById(id:string|null){
        if(!id){
            return null
        }
        const post =  await postCollection.findOne({_id:new ObjectId(id)})
        if(post){
            //@ts-ignore
            delete Object.assign(post, {["id"]: post["_id"] })["_id"];
        }
        return post
    },
    async deletePost(id:string){
        const result = await postCollection.deleteOne({_id:new ObjectId(id)});
        return result.deletedCount === 1
    },
    async createPost(post:postType){
        await postCollection.insertOne(post);
        // @ts-ignore
        delete Object.assign(post, {["id"]: post["_id"] })["_id"];
        return post
    },
    async updatePost( id:string,
                      title: string,
                      shortDescription: string,
                      content: string,
                      blogId: string){
        const result = await postCollection.updateOne({_id:new ObjectId(id)},{$set:{
                title:title,
                shortDescription:shortDescription,
                content:content,
                blogId:blogId
            }})
        return result.matchedCount === 1
    },

    async getPostsByBlogId(blogId:string,pageNumber:number, pageSize:number,sortBy:string,sortDirection:any){

        console.log(blogId)
        //@ts-ignore
        const posts = await postCollection.find({ blogId:new ObjectId(blogId) })
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort( {[sortBy] : sortDirection} )
            .toArray();

        console.log(posts)
        const temp = posts.map((post) => {
            //@ts-ignore
            delete Object.assign(post, {["id"]: post["_id"] })["_id"];
            return post
        })
        //@ts-ignore
        const totalCount:number = await postCollection.count({blogId:new ObjectId(blogId)});

        const outputObj = {
            pagesCount:Math.ceil(totalCount/pageSize),
            page:pageNumber,
            pageSize:pageSize,
            totalCount:totalCount,
            items:temp
        }
        return outputObj
    },
    async deleteAll():Promise<boolean>{
        const result = await postCollection.deleteMany({})
        return result.deletedCount === 1
    }
}