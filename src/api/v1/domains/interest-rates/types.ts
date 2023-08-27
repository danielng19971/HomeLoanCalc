import { Request } from 'express';
import {Collection,CreateCollection,Params,GetCollection}from '../../commons/index'
import {InterestRatesSchema} from './model'

const collectionName = 'interest rates'
export class InterestRates extends Collection {
    party:string;
    dateOfEffect:string;
    rate:number;
    constructor (party:string,dateOfEffect:string,rate:number){
        super(collectionName);
        this.party = party
        this.dateOfEffect = dateOfEffect
        this.rate = rate
    }

}
export class InterestParams extends Params {
    static POST(req:Request) {
        return {
            party: req.body.party,
            dateOfEffect :req.body.dateOfEffect,
            rate:req.body.rate
         }
    }
    static GET(req:Request){
        const dateFrom = req.query.dateFrom
        const dateTo = req.query.dateTo
        return{
            dateFrom : dateFrom!=undefined?Number(dateFrom):dateFrom,
            dateTo : dateTo!=undefined?Number(dateTo):dateTo,
            party : req.query.party
        }
    }
}
export class CreateInterestRates extends CreateCollection {
    constructor(interest:InterestRates){
        super(InterestRatesSchema,interest)
    }
}
export class GetInterestRates extends GetCollection{
    constructor(){
        super(collectionName,true)
    }
}
