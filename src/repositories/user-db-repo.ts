import {OptionalId, Document, ObjectId} from "mongodb";
import {blogCollection, userCollection} from "./db";
import {userDBType, userType} from "../types";
import {userService} from "../domain/user-service";

export const userRepo = {
    async createUser(user:userType):Promise<userType>{
        await userCollection.insertOne(user)
        // @ts-ignore
        delete Object.assign(user, {["id"]: user["_id"] })["_id"];
        delete user.passwordHash;
        delete user.passwordSalt;

        return user;
},
    async findByLogin(login:string){
        const user = await userCollection.findOne({login:login}/*{$or:[{"email":loginOrEmail},{"userName":loginOrEmail}]}*/)
        if(user){
            // @ts-ignore
            delete Object.assign(user, {["id"]: user["_id"] })["_id"];
        }
        return user;
},
    async deleteUser(id:string){
        const result = await userCollection.deleteOne({_id:new ObjectId(id)})
        return result.deletedCount === 1
    },

    async getUsers(searchLoginTerm:string, searchEmailTerm:string, pageNumber:number,pageSize:number, sortBy:string, sortDirection:any){
        const users = await userCollection.find({$or:[{"login":{$regex:searchLoginTerm, $options : 'i' }},{"email":{$regex: searchEmailTerm,$options : 'i' }}]})
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort( {[sortBy] : sortDirection} )
            .toArray();

        const temp = users.map((user) => {
            //@ts-ignore
            delete Object.assign(user, {["id"]: user["_id"] })["_id"];
            delete user.passwordHash;
            delete user.passwordSalt;
            return user
        })

        const totalCount = await userCollection.count({$or:[{"login":{$regex:searchLoginTerm, $options : 'i' }},{"email":{$regex: searchEmailTerm,$options : 'i' }}]});

        const outputObj = {
            pagesCount:Math.ceil(totalCount/pageSize),
            page:pageNumber,
            pageSize:pageSize,
            totalCount:totalCount,
            items:temp
        }
        return outputObj
    },

}