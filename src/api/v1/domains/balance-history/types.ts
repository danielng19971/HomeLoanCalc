import { Request } from 'express';
import {Collection,CreateCollection,Params,GetCollection}from '../../commons/index'
import {BalanceHistorySchema} from './model'

const collectionName = 'balance-history'
export class BalanceHistory extends Collection {
    party:string;
    amount:number;
    date:string;
    sort:number;
    constructor (party:string,amount:number,date:string){
        super(collectionName);
        this.party = party
        this.amount = amount
        this.date = date
        this.sort = Date.now();
    }

}
export class BalanceHistoryParams extends Params {
    static POST(req:Request) {
        return {
            party: req.body.party,
            amount :req.body.amount,
            date:req.body.date // format yyyy-MM-dd
         }
    }
    static GET(req:Request){
        const dateFrom = req.query.dateFrom
        const dateTo = req.query.dateTo
        return{
            dateFrom : dateFrom as string,
            dateTo : dateTo as string,
            party : req.query.party as string
        }
    }
}
export class CreateBalanceHistory extends CreateCollection {
    constructor(bal:BalanceHistory){
        super(BalanceHistorySchema,bal)
    }
}
export class GetBalanceHistory extends GetCollection{
    constructor(){
        super(collectionName,true)
    }
}
