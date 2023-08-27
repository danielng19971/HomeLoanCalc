import { z } from 'zod'
import {CollectionSchema} from '../../commons/index'
import moment from 'moment'

//export default 
const commonObj = {
    party: z.string({
        required_error: "Party is required"
    }),
    amount: z.number({
        invalid_type_error: "Invalid amount type, must be number",
        required_error: "amount is required"
    }),
    date: z.string().refine((item)=>moment(item, 'YYYY-MM-DD', true).isValid(),{
        message:"date must be of YYYY-MM-DD format"
    })

}

export const interestCharges = CollectionSchema.extend(commonObj)

export const CreateParamsSchema = z.object(commonObj)

export const GetParamSchema  = z.object({
    dateTo: z.string().refine((item)=>moment(item, 'YYYY-MM-DD', true).isValid(),{
        message:"date must be of YYYY-MM-DD format"
    }).optional(),
    dateFrom: z.string().refine((item)=>moment(item, 'YYYY-MM-DD', true).isValid(),{
        message:"date must be of YYYY-MM-DD format"
    }).optional(),
    party:z.string({
        required_error: "party is required"
    })
})