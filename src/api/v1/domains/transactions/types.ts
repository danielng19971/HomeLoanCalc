import {Collection,CreateCollection,GetCollection}from '../../commons/index'
import z from 'zod'

const collection_name ="transactions"
export class Transaction extends Collection {
    fromParty:string;
    toParty:string;
    amount:number;
    constructor(fromParty:string,toParty:string,amount:number){
        super(collection_name)
        this.fromParty= fromParty
        this.toParty =toParty
        this.amount = amount
    }
}
export class CreateTransaction extends CreateCollection {
    constructor(schema:z.Schema,transaction:Transaction){
        super(schema,transaction)
    }
}
export interface PostTransactionParams {
    from:string;
    to:string;
    amount:number;
}

export class GetTransaction extends GetCollection {
    constructor(){
        super(collection_name,true)
    }
}
