import {CreateInterestRates,InterestRates,InterestParams,GetInterestRates} from './types'
import {CreateParamsSchema,GetParamSchema} from './model'
import {Params} from '../../commons'
import { Request } from 'express'

export async function handleCreateInterestRates(req:Request){
    try{
        const params = InterestParams.POST(req)
        if(Params.validate(CreateParamsSchema,params)) {
            const interestRate = new InterestRates(params.party,params.dateOfEffect,params.rate)
            const createInterest = await new CreateInterestRates(interestRate).createCollection()
            return createInterest
        }
   }catch(e:any){
        throw e
    }
}

export async function handleGetTransaction(req:Request){
    try{
        const params = InterestParams.GET(req)
        if(Params.validate(GetParamSchema,params)) {
            const createInterest = new GetInterestRates()
            createInterest.setQuery('party','==',params.party)
            const data = await createInterest.getData()
            let retVal:any = [];
            const dateFrom = params.dateFrom
            const dateTo = params.dateTo

            if(dateFrom!=undefined){
                retVal= data.filter((item:any)=>dateFrom<=item.dateOfEffect)
            }
            
            if(dateTo!=undefined){
                retVal= retVal.filter((item:any)=>dateTo>=item.dateOfEffect )
            }
            
            return retVal
        }
    }catch(e:any){
        throw e
    }
}