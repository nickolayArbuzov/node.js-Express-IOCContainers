import {userDBType} from "../types";
import jwt, {verify} from 'jsonwebtoken'
import {settings} from "../settings/settings";
import {ObjectId} from "mongodb";

export const jwtService = {
    async createJwt(user:userDBType){
        const token = jwt.sign({userId:user.id}, settings.JWT_SECRET, {expiresIn:'1h'})
        console.log(user)
        return {accessToken:token}
    },

    async getUserByAccessToken(token:string){
      try{
          const result:any = jwt.verify(token, settings.JWT_SECRET);
          return new ObjectId(result.userId)
      }
      catch(e){
          return null
      }
    }
}