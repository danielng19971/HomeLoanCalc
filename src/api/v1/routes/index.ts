import {Router,Request,Response } from "express";
import Parties from '../domains/parties/routes'
import Balance from '../domains/balances/routes'
import Transaction from "../domains/transactions/routes";
import InterestRates from '../domains/interest-rates/routes'
import BalanceHistory  from "../domains/balance-history/routes";
const router = Router()



router.use("/party",Parties)
router.use("/balance",Balance)
router.use("/transaction",Transaction)
router.use("/interestRates",InterestRates)
router.use("/balance-history",BalanceHistory)

export default router;