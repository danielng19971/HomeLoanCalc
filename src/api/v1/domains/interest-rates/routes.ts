import { handleCreateInterestRates,handleGetTransaction} from './controller'
import {Router,Request,Response} from "express";
const router = Router()

//POST: Create Transaction
router.post('/',async(req:Request,res:Response)=>{
    try{
       const result = await handleCreateInterestRates(req)
       //if(result===201)
       res.status(201).send(result)
    }catch(e:any){
        res.status(e.errorCode).send(e)
    }
})


//GET: getTransaction
router.get('/',async(req:Request,res:Response)=>{
    try{
        const result = await handleGetTransaction(req)
        res.send(result)
    }catch(e:any){
        res.status(e.errorCode).send(e)
    }
})



export default router