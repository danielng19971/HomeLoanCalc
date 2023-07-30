import {createParty} from './controller'
import {partyType} from './types'

import {Router,Request,Response } from "express";

const router = Router()

router.post('/',async(req:Request,res:Response)=>{

    //console.log(req)

    try{
        const party = await createParty(req.body.name, partyType.LoanPayer)
        res.send(party)
    }catch(e :any){
        res.status(e.code).send(e)
    }
    
    
})

export default router