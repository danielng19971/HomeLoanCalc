import {getDisplayBalance,addToBalance,addToBalanceValidation,getDisplayBalanceFormat,handleEditBalance} from './controller'
import {Balance,EditParams} from './types'
import {handleMissingQueryParams} from '../../util/errorHandling'
import {Error} from '../../util/types'

import {Router,Request,Response} from "express";

const router = Router()

//POST: Add to Balance
router.post('/',async(req:Request,res:Response)=>{
    try{
        const reqParam = addToBalanceValidation(req)
        const balance = await addToBalance(reqParam.party,reqParam.amount,reqParam.accountType)
        //res.send(getDisplayBalanceFormat(balance as Balance))
        res.send(balance)
    }catch(e:any){
        res.status(e.errorCode).send(e)
    }
})

router.put('/:party',async (req:Request,res:Response)=>{
    try{
        const balance = await handleEditBalance(req)
        res.send(balance)
    }catch(e:any){
        res.status(e.errorCode).send(e)
    }
})

// GET: getBalance
router.get('/',async(req:Request,res:Response)=>{
    const partyName:string= req.query.party as string
    try{
        if (partyName===undefined||partyName==="")handleMissingQueryParams("party")
        let party:Balance = await getDisplayBalance(partyName) as Balance;
        res.send(party)
    }catch(e :any){
        res.status(e.errorCode).send(e)
    }
})








export default router