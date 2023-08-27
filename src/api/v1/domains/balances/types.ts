export interface Balance{
    party:string,
    amount:number,
    createDateTime:number,
    updateDateTime:number,
    updateUser:string
    id:string,
    accountType:accountType
}


export enum accountType{
    OFFSET="offset",
    LOAN="loan"
}

export interface EditParams {
    party:string,
    amount:number
}