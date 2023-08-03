import {createParty,getParty,formatDisplayParty} from './controller'
import {partyType,Party} from './types'
import {handleMissingQueryParams} from '../../util/errorHandling'

import {Router,Request,Response} from "express";

const router = Router()

router.post('/',async(req:Request,res:Response)=>{

    //console.log(req)

    try{
        const party = await createParty(req.body.name, partyType.LoanPayer)
        res.send(party)
    }catch(e :any){
        res.status(e.errorCode).send(e)
    }
    
    
})
router.get('/',async(req:Request,res:Response)=>{
    const partyName:string= req.query.name as string
    try{
        if (partyName===undefined||partyName==="")handleMissingQueryParams("name")
        let party:Party = await getParty(partyName) as Party;

        res.send(formatDisplayParty(party))
    }catch(e :any){
        res.status(e.errorCode).send(e)
    }
})




export default router