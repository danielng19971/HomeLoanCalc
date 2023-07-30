export interface Party{
    name:string,
    dateCreated:number,
    dateUpdated:number,
    id:string,
    type:string
}

export enum partyType {
    LoanOwner = "LoanOwner",
    LoanPayer = "LoanPayer"
}