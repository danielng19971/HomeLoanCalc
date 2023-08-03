import {Moment} from 'moment'
export interface Party{
    name:string,
    dateCreated:number,
    dateUpdated:number,
    id:string,
    type:partyType,
    updateUser?:string
}
export interface DisplayParty{
    name:string,
    dateCreated:Moment,
    dateUpdated:Moment,
    id:string,
    type:string
}

export enum partyType {
    LoanOwner = "Loan Owner",
    LoanPayer = "Loan Payer"
}