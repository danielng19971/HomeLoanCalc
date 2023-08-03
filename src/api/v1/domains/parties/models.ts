import {z}from 'zod'
import { Party,partyType } from './types'

const Schema = z.object({
    name:z.string(),
    dateCreated:z.number(),
    dateUpdated:z.number(),
    id:z.string(),
    type:z.nativeEnum(partyType),
})

export default Schema