import { postRepo } from "../repositories/post-db-repo";
import {postType} from "../types";

export const postService = {
    async findAllPosts(pageNumber:number, pageSize:number, sortBy: any , sortDirection: any){
        return await postRepo.findAllPosts(pageNumber,pageSize, sortBy, sortDirection);
    },
    async findPostById(id:string){
        return postRepo.findPostById(id);
    },
    async deletePost(id:string){
        return postRepo.deletePost(id);
    },
    async createPost(title:string, shortDescription:string, content:string, blogId:string, blogName:string) {
        const post:postType = {
            title:title,
            shortDescription:shortDescription,
            content:content,
            blogId:blogId,
            blogName:blogName,
            createdAt:new Date().toISOString()
        }

        const createdPost = await postRepo.createPost(post);
        return createdPost;
        },
    async updatePost( id:string,
                      title: string,
                      shortDescription: string,
                      content: string,
                      blogId: string){
        return postRepo.updatePost(id,title,shortDescription,content,blogId)
    },
    async getPostsByBlogId(blogId:string,pageNumber:number, pageSize:number,sortBy:any,sortDirection:any){
        return postRepo.getPostsByBlogId(blogId,pageNumber, pageSize,sortBy,sortDirection);
    }
}
