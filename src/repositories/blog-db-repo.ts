import {blogType} from "../types";
import {blogCollection} from "./db";
import {ObjectId} from "mongodb";

export interface blogsPaginator{
    pageCount:number,
    page:number,
    pageSize:number,
    totalCount:number,
    items:blogType[]
}

export const blogsRepo = {
    async findAllBlogs(searchNameTerm:any, pageNumber:number,pageSize:number, sortBy:string, sortDirection:any):Promise<{ pagesCount: number; pageSize: number; page: number; totalCount: number; items:any[]}>{

        console.log("seqarchNameTerm "+searchNameTerm);

        const blogs = await blogCollection.find({"name":{$regex:searchNameTerm,$options : 'i' }})
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort( {[sortBy] : sortDirection} )
            .toArray();

        console.log(blogs);
        const temp = blogs.map((blog) => {
            //@ts-ignore
            delete Object.assign(blog, {["id"]: blog["_id"] })["_id"];
            return blog
        })

        const totalCount = await blogCollection.count({"name":{$regex:searchNameTerm ,$options : 'i' }});

        const outputObj = {
            pagesCount:Math.ceil(totalCount/pageSize),
            page:pageNumber,
            pageSize:pageSize,
            totalCount:totalCount,
            items:temp
        }
        return outputObj
    },

    async findBlogById(id:string):Promise<blogType | undefined | null>{
        const blog = await blogCollection.findOne({_id:new ObjectId(id)});
        if(blog){
            //@ts-ignore
            delete Object.assign(blog, {["id"]: blog["_id"] })["_id"];
        }
        return blog
    },
    async createBlog(blog:blogType):Promise<blogType | null>{

        await blogCollection.insertOne(blog);
        // @ts-ignore
        delete Object.assign(blog, {["id"]: blog["_id"] })["_id"];
        return blog;
    },
    async deleteBlog(id:string):Promise<boolean>{
        const result = await blogCollection.deleteOne({_id:new ObjectId(id)});
        return result.deletedCount === 1
    },
    async updateBlog(id:string, name:string, youtubeUrl:string ):Promise<boolean>{
        const result = await blogCollection.updateOne({_id:new ObjectId(id)},{$set:{name:name, youtubeUrl:youtubeUrl}})
        return result.matchedCount === 1
    },
    async deleteAll():Promise<boolean>{
        const result = await blogCollection.deleteMany({})
        return result.deletedCount ===1
    }

}