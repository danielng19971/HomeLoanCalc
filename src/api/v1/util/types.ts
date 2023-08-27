
export interface Error {
    errorCode : number,
    errorMessage:string
}

export abstract class ErrorClass {
    error:Error
    constructor(error:Error){
        this.error = error
    }
    public throwError() {
    }
}

export const ErrorType = {
    party_not_exist : {errorCode:404,errorMessage:"Party Doesn't exist"},
    party_exist : {errorCode:400,errorMessage:"Party Doesn't exist"},
    not_found : {errorCode:404,errorMessage:"Not found"},
    missing_query_param :{errorCode:400,errorMessage:"Missing query"},
    system_error : {errorCode:500,errorMessage:"System error please contact admin"},
    params_error:{errorCode:400,errorMessage:""}
}

export default {Error,ErrorClass,ErrorType}
 
