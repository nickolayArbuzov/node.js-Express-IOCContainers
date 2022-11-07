import bcrypt from 'bcrypt';
import { userRepo } from '../repositories/user-db-repo';
import {userDBType, userType} from "../types";

export const userService = {
    async createUser(login:string, password:string, email:string):Promise<userType>{
        console.log("create user")
        const passwordSalt = await bcrypt.genSalt(12)
        const passwordHash = await this._generateHash(password, passwordSalt)
        console.log(passwordHash)
        const newUser:userType = {
            login,
            email,
            passwordHash,
            passwordSalt,
            createdAt:new Date().toISOString()
        }

        return userRepo.createUser(newUser)
    },
    async _generateHash(password:string, salt:string){
        const hash = await bcrypt.hash(password, salt)
        return hash
    },
    async checkCredentials(login:string, password:string):Promise<any>{
        const user = await userRepo.findByLogin(login)
        console.log("User in creds with login ---> "+login)
        console.log(user)
        if(!user) return null
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if(user.passwordHash !== passwordHash){
            return null
        }
        return user
    },
    async deleteUser(id:string){
        return await userRepo.deleteUser(id);
    },
    async getUsers( searchLoginTerm:any, searchEmailTerm:any, pageNumber: number, pageSize: number, sortBy: any, sortDirection: any){
        return await userRepo.getUsers(searchLoginTerm, searchEmailTerm,pageNumber, pageSize, sortBy, sortDirection);
    }

}