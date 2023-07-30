import {Router,Request,Response } from "express";
import Parties from '../domains/parties/routes'
const router = Router()



router.use("/party",Parties)

export default router;