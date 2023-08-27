import { z } from 'zod'
import { InterestRates } from './types'
import {CollectionSchema} from '../../commons/index'

//export default 

export const InterestRatesSchema = CollectionSchema.extend({
    party: z.string({
        required_error: "Party is required"
    }),
    rate: z.number({
        invalid_type_error: "Invalid interest rate type, must be number",
        required_error: "interest rate is required"
    }),
    dateOfEffect: z.number({
        required_error: "Party is required"
    })

})

export const CreateParamsSchema = z.object({

    party: z.string({
        required_error: "Party is required"
    }),
    rate: z.number({
        invalid_type_error: "Invalid interest rate type, must be number",
        required_error: "interest rate is required"
    }),
    dateOfEffect: z.number({
        required_error: "Party is required"
    })

})

export const GetParamSchema  = z.object({

    dateFrom: z.number({
        invalid_type_error: "Invalid date, must be number",
    }).optional(),
    dateTo: z.number({
        invalid_type_error: "Invalid date, must be number",
    }).optional(),
    party:z.string({
        required_error: "party is required"
    })

})

