import { blogsRepo } from "../repositories/blog-db-repo";
import {blogType} from "../types";

export const blogsService = {
   async findAllBlogs(searchNameTerm: any, pageNumber: number, pageSize: number, sortBy: any, sortDirection: any){
       return await blogsRepo.findAllBlogs(searchNameTerm, pageNumber,pageSize, sortBy, sortDirection);
   },
    async findBlogById(id:string){
       return blogsRepo.findBlogById(id);
    },
    async createBlog(name:string, youtubeUrl:string){
        const blog:blogType = {
            name:name,
            youtubeUrl:youtubeUrl,
            createdAt:new Date().toISOString()
        }

        const createdBlog = await blogsRepo.createBlog(blog);
        return createdBlog;
    },
    async deleteBlog(id:string){
       return await blogsRepo.deleteBlog(id);
    },
    async updateBlog(id:string, name:string, youtubeUrl:string){
       return await blogsRepo.updateBlog(id, name, youtubeUrl);
    }

}