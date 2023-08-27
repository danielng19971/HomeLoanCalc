import { Request } from "express"
import { handleZodError } from "../util/errorHandling"
import {Collection, GetCollection, CreateCollection} from "./index"


export class Params{
    static validate (validateSchema:any,params:any){
        try {
            const result = validateSchema.safeParse(params)
            if (!result.success) {
                throw handleZodError(result.error.issues[0], 400)
            } else {
                return true;
            }
        }catch(e:any){
            throw e
        }
    }
    static POST (req:Request){

    }
    static GET (req:Request){

    }
    static PUT(req:Request){

    }
    static DELETE(req:Request){
        
    }
}


// abstract class Handle {

// }

// export class HandleGet extends Handle{
//     getCollectionObj :GetCollection
//     constructor(getCollectionObj:GetCollection){
//         super()
//         this.getCollectionObj = getCollectionObj;
//     }
//     async getCollection(){
//         try{
//             const data = await this.getCollectionObj.getData()
//             return data
//             }catch(e:any){
//             throw e
//         }
//     }

// }

// export class HandleCreate extends Handle{
//     postCollectionObj : CreateCollection
//     constructor(postCollectionObj:CreateCollection){
//         super();
//         this.postCollectionObj = postCollectionObj
//     }
//     async postCollection(){
//         try {
//             const retVal = await this.postCollectionObj.createCollection();
//             return retVal;
//         } catch (e: any) {
//             throw e
//         }
//     }
// }
