import { Transaction, CreateTransaction, PostTransactionParams ,GetTransaction} from './types';
import {DateTime } from '../../util/index'
import { TransactionSchema, CreateTransactionParams,GetTransactionParams } from './model'
import { Request } from 'express';
import { handleZodError, ErrorUtil } from '../../util/errorHandling';
import { ErrorType } from '../../util/types'
import axios from 'axios'

const currDate = DateTime.getCurrentTimeStamp()

// const collection = firebase.collection("balances")

export async function handleGetTransaction(req: Request){
    try{
        const param = getGETParamsFromRequest(req)
        const retVal = await getTransaction(param.dateFrom,param.dateTo)
        return retVal
    }catch(e:any){
        throw e
    }
    
}

function getGETParamsFromRequest (req: Request){
    const dateFrom = req.body.from
    const dateTo = req.body.to
    const paramsObj = { dateFrom, dateTo }
    try {
        const result = GetTransactionParams.safeParse(paramsObj)
        if (!result.success) {
            throw handleZodError(result.error.issues[0], 400)
        } else {
            return paramsObj;
        }
    }catch(e:any){
        throw e
    }
}

async function getTransaction(dateFrom:number,dateTo:number) {
    try{
        const transactiondb = new GetTransaction()
        transactiondb.setQuery('createDateTime','>=',dateFrom).setQuery('createDateTime', '<=', dateTo)
        const data = await transactiondb.getData()
        return data
        }catch(e:any){
        throw e
    }
}
//////////////
export async function createTransaction(fromParty: string, toParty: string, amount: number) {
    const transaction = new Transaction(fromParty,toParty,amount)

    //init 
    const id = generateID(fromParty, toParty, currDate)
    const trans = new CreateTransaction(TransactionSchema, transaction)

    try {
        const retVal = await trans.createCollection();
        return retVal;
    } catch (e: any) {
        throw e
    }
}


export async function createTransactionValidation(params: PostTransactionParams) {
    try {
        if(params.from!="self")if (!await checkIfPartyExist(params.from)) new ErrorUtil(ErrorType.party_not_exist).throwError()
        if (!await checkIfPartyExist(params.to)) new ErrorUtil(ErrorType.party_not_exist).throwError()
        return true
    } catch (e) {
        throw e
    }
}

async function checkIfPartyExist(partyName: string) {
    const URL = process.env.BASE_URL + "/party/?name=" + partyName;
    try {
        const party = await axios.get(URL)
        if (party.status == 200) return true
        else return false

    } catch (e: any) {
        return false
    }

}
export function getParamsFromRequest(req: Request) {

    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount
    const paramsObj = { from, to, amount }
    try {
        const result = CreateTransactionParams.safeParse(paramsObj)
        if (!result.success) {
            throw handleZodError(result.error.issues[0], 400)
        } else {
            return paramsObj;
        }
    }catch(e:any){
        throw e
    }
}

export async function handleCreateTransactionAPI(req: Request) {
    try {
        const params = getParamsFromRequest(req) 
        const valid = await createTransactionValidation(params as PostTransactionParams)
        if (valid) {
            const transaction =  await createTransaction(params?.from,params?.to,params?.amount) as Transaction

            const fromPartyAmount = transaction.amount*(-1);
            const toPartyAmount = transaction.amount
            let status = 200
            if(params.from != 'self')status = await callAddBalance(params?.from,fromPartyAmount)
            const status1 = await callAddBalance(params?.to,toPartyAmount)
            if(status==200 && status1==200)
            return 201
        }else{
            new ErrorUtil(ErrorType.party_not_exist).throwError()
        }
    } catch (e) {
        new ErrorUtil(ErrorType.system_error).throwError()
    }

}

async function callAddBalance (party:string,amount:number){
    const URL = process.env.BASE_URL + "/balance/"+party
    const PUTBody = {
        amount
    }
    try{
       const retVal=  await axios.put(URL,PUTBody)
       if(retVal.status!=200){
        throw new ErrorUtil(ErrorType.system_error)
       }
       return 200
    }catch(e:any){
        throw e
    }
    
}

const generateID = (fromParty: string, toParty: string, createDateTime: number) => {
    return fromParty + toParty + createDateTime
}