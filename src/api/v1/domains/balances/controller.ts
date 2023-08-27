import { Balance, accountType, EditParams } from "./types";
import { BalanceSchema, AddToBalanceSchema } from './model'
import firebase from "../../../../config/firebase";
import { notFound, handleZodError, ErrorUtil } from '../../util/errorHandling'
import { ErrorType } from '../../util/types'
import {DateTime} from '../../util/index'
import moment from 'moment'
import { Request } from "express";

const collection = firebase.collection("balances")
const currDate = DateTime.getCurrentTimeStamp()

export async function getBalance(party: string) {
        try {
                const collections = await collection.where('party', '=', party).get()

                let balances: Array<Balance> = [];

                if (collections._size > 0) {
                        collections.forEach((data: any) => {
                                balances.push(data.data())
                        });
                        return balances[0]
                } else {
                        return undefined;
                }
        } catch (e: any) {
                throw e
        }
}

export async function hasBalance(party: string) {
        try {
                const balance = await getBalance(party)
                if (balance != undefined) {
                        return true
                } else {
                        return false
                }
        } catch (e) {

        }
}

export async function createBalance(party: string, accountType: accountType) {
        const balance: Balance = {
                party,
                amount: 0,
                createDateTime: currDate,
                updateDateTime: currDate,
                updateUser: 'default',
                id: generateID(party, currDate),
                accountType
        }

        try {
                await collection.doc(balance.id).set(balance);
        } catch (e: any) {
                throw e
        }
        return balance
}

export async function updateBalance(currentBal: Balance, amount: number) {
        const updateBalance = currentBal;
        updateBalance.amount = updateBalance.amount + amount;
        updateBalance.updateDateTime = currDate;
        try {
                await collection.doc(currentBal.id).set(updateBalance);
        } catch (e: any) {
                throw e
        }
        return updateBalance
}

export async function addToBalance(party: string, amount: number, accountType: accountType) {
        try {
                const hasBal = await hasBalance(party)

                if (hasBal) {
                        const currBal = await getBalance(party) as Balance
                        const updatedBal = await updateBalance(currBal, amount)
                        return updatedBal;

                } else {
                        const createdBal = await createBalance(party, accountType)
                        const updatedBal = await updateBalance(createdBal, amount)
                        return updatedBal
                }
        } catch (e: any) {

        }
}

export async function getDisplayBalance(party: string) {
        try {
                const balance = await getBalance(party)

                if (balance != undefined) {
                        return getDisplayBalanceFormat(balance)
                } else {
                        notFound(`Balance for ${party} not found`)
                }
        } catch (e: any) {
                return e
        }
}

export function getDisplayBalanceFormat(balance: Balance) {
        const formattedBal = {
                party: balance.party,
                amount: balance.amount,
                createDateTime: moment(balance.createDateTime),
                updateDateTime: moment(balance.updateDateTime),
                updateUser: balance.updateUser,
                id: balance.id,
                accountType: balance.accountType
        }
        return formattedBal;
}

export function addToBalanceValidation(req: Request) {

        const party = req.body.party
        const amount = req.body.amount
        const accountType = req.body.accountType
        const paramsObj = { party, amount, accountType }

        const result = AddToBalanceSchema.safeParse(paramsObj)
        if (!result.success) {
                throw (handleZodError(result.error.issues[0], 400))
        } else {
                return paramsObj;
        }
}
 async function putBalanceValidation(party:string,amount:number) {
        if (amount == undefined) new ErrorUtil(ErrorType.missing_query_param).throwError()
        try {
                const balance = await getBalance(party)
                if (balance == undefined) {
                        new ErrorUtil(ErrorType.party_not_exist).throwError()
                }
                return balance
        } catch (e: any) {
                throw e
        }


        let retVal: any
        return retVal
}

 function getPutBalanceParams(req:Request){
        const party = req.params.party
        const amount = req.body.amount
        
        return {party,amount}
}
export async function handleEditBalance(req:Request){
        const params = getPutBalanceParams(req)
        try{
                const balance = await putBalanceValidation(params.party,params.amount) as Balance
                const editedBalance = await addToBalance(balance.party,params.amount,balance.accountType)
                return editedBalance
        }catch (e){
                throw e
        }
}

const generateID = (partyName: string, createDateTime: number) => {
        return partyName + createDateTime
}