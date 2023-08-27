import logger from "./logger"
 
import {Error,ErrorClass,ErrorType} from "./types"

const handleMissingQueryParams = (paramName:string)=>{
    const message = `Missing Query Param of ${paramName}`
    throwError(400,message)
}
const notFound = (message:string)=>{
    throwError(404,message)
}
const partyExistErr = (party:string)=>{
    const message = `Party ${party} exists`
    throwError(400,message)
}
const partyDoesNotExist = (party:string)=>{
    const message = `Party ${party} doesn't exists`
    throwError(400,message)
}

const throwError = (errorCode:number,errorMessage:string)=>{
    const error : Error = {errorCode, errorMessage}
    logger.error(error.errorMessage)
    throw error
}
const handleZodError = (e :any,errorCode:number):Error=>{
    const error :Error = {errorCode:errorCode,errorMessage:e.message}
    logger.error(error.errorMessage)
    return error
}

export class ErrorUtil extends ErrorClass {
    constructor(error:Error){
        super(error)
    }
    public useZod(zodError:any){
        this.error.errorMessage = zodError.message
    }
    public throwError(): void {
        logger.error(this.error.errorMessage)
        throw this.error
    }
}


export {notFound,partyExistErr,handleMissingQueryParams,handleZodError,partyDoesNotExist}