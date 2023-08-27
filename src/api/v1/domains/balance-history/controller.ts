import {BalanceHistory,BalanceHistoryParams,CreateBalanceHistory,GetBalanceHistory} from './types'
import {CreateParamsSchema,GetParamSchema} from './model'
import {Params} from '../../commons'
import { Request } from 'express'
import moment from 'moment'
const sortArray = require ('sort-array')

const START_DATE = "1970-01-01"

export async function HandleAddToBalanceHistory(req:Request){
    const params = BalanceHistoryParams.POST(req)
    let currentBal:any 

    try{
        if(Params.validate(CreateParamsSchema,params)) {
            const balHistory = await getBalanceHistory(params.party,START_DATE,params.date) 
            if(balHistory.length>0){
                currentBal= balHistory[0]
            }
            if (currentBal === undefined){
                return await createBalance(params.party,params.amount,params.date)
            }else{
                currentBal.amount = currentBal.amount + params.amount
                return await createBalance(params.party,currentBal.amount,params.date)

               // return await updateBalance(new BalanceHistory(currentBal.party,currentBal.amount,currentBal.date).updateBalance(currentBal))
            }
        }
    }catch (e:any){
        throw e
    }
    

}
async function updateBalance(balanceHistory:BalanceHistory) {
    try{
            const createBalanceHistory = await new CreateBalanceHistory(balanceHistory).createCollection()
            return createBalanceHistory
   }catch(e:any){
        throw e
    }
}

async function createBalance (party:string,amount:number,date:string){
    try{
        const params = {party,amount,date}
        
            const balanceHistory = new BalanceHistory(params.party,params.amount,params.date)
            const createBalanceHistory = await new CreateBalanceHistory(balanceHistory).createCollection()
            return createBalanceHistory
        
   }catch(e:any){
        throw e
    }
}

export async function handleGetBalanceHistory(req:Request){
    try{
        const params = BalanceHistoryParams.GET(req)
        if(Params.validate(GetParamSchema,params)) {
           return await getBalanceHistory(params.party,params.dateFrom,params.dateTo)
        }
    }catch(e:any){
        throw e
    }
}

async function getBalanceHistory (party:string,dateFrom:string,dateTo:string){
    const params = {party,dateFrom,dateTo}
    try{
        if(Params.validate(GetParamSchema,params)) {
            const createInterest = new GetBalanceHistory()
            //createInterest.setQuery('party','==',params.party)
            const data = await createInterest.getData()
            let retVal:any = data;
            const dateFrom = params.dateFrom
            const dateTo = params.dateTo
            if(dateFrom!=undefined){
                retVal= data.filter((item:any)=>moment(dateFrom)<=moment(item.date))
            }
            
            if(dateTo!=undefined){
                retVal= retVal.filter((item:any)=>moment(dateTo)>=moment(item.date))
            }
            // sorting
            return sortArray(retVal,{
                by:'sort',
                order:'desc'
            })
        }
        
    }catch(e:any){
        throw e
    }
}
