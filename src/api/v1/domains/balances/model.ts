import {z}from 'zod'
import { Balance,accountType } from './types'

const BalanceSchema = z.object({
    party:z.string(),
    amount:z.number().positive(),
    createDateTime:z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
    updateDateTime:z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
    updateUser:z.string({
        required_error: "Please provide a valid User",
      }),
    id:z.string(),
    accountType:z.nativeEnum(accountType)
})

const AddToBalanceSchema = z.object({
    party:z.string({
      required_error:"Amount is required"
    }),
    amount:z.number({
      invalid_type_error:"Invalid amount type, must be number",
      required_error:"Amount is required"
    }),
    accountType:z.nativeEnum(accountType)
})

export {BalanceSchema,AddToBalanceSchema}