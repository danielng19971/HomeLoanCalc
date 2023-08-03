import {Router,Request,Response } from "express";
import Parties from '../domains/parties/routes'
import Balance from '../domains/balances/routes'
const router = Router()



router.use("/party",Parties)
router.use("/balance",Balance)

export default router;