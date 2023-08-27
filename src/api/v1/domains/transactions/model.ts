import { z } from 'zod'
import {CollectionSchema} from '../../commons/index'


//export default 

const TransactionSchema = CollectionSchema.extend({
    fromParty: z.string({
        required_error: "from party is required"
    }),
    toParty: z.string({
        required_error: "to party is required"
    })
})

const CreateTransactionParams = z.object({

    from: z.string({
        required_error: "from party is required"
    }),
    amount: z.number({
        invalid_type_error: "Invalid amount type, must be number",
        required_error: "Amount is required"
    }),
    to: z.string({
        required_error: "from party is required"
    })

})

const GetTransactionParams = z.object({

    dateFrom: z.number({
        required_error: "from date is required"
    }),
    dateTo: z.number({
        required_error: "to date is required"
    })

})

export { TransactionSchema,CreateTransactionParams,GetTransactionParams};