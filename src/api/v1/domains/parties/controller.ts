import {Party,partyType,DisplayParty} from './types'
import Schema from './models'
import firebase from '../../../../config/firebase'
import {getCurrentTimeStamp} from '../../util/dateTime'
import Logger from '../../util/logger'
import {notFound,partyExistErr} from '../../util/errorHandling'
import moment from 'moment'

const collection = firebase.collection("parties")

 const createParty = async(name:string, type:partyType)=>{
    const currDate = getCurrentTimeStamp()
    const party:Party = {
        name,
        dateCreated : currDate,
        dateUpdated : currDate,
        type,
        id : generateID(name,currDate)
    }
    
    //Validate party
    //if(!Schema.parse(party)) return 

    try{
        const existed = await partyExist(name)
        if(existed){
         throw partyExistErr(name) 
        }
        await collection.doc(party.id).set(party);
    }catch (e:any){
        throw e
    }

    return party

}
const getParty = async (name:string)=>{
    let party :Party;
    try{
        const collections = await collection.where('name', '=', name).get()

        let parties : Array<Party> =[];
        
        if(collections._size>0){
            collections.forEach((data:any) => {
                parties.push(data.data())
            });
            party = parties[0]

            return party;
        }else{
            notFound(`Party ${name} not found`)
        }
        
    }catch (e:any){ 
        Logger.error(e.message)
    }


}
const partyExist = async (name:string) =>{
    try {
        return await getParty(name)?true:false
    }catch(e:any){
        if(e.code==404)return false
    }
    
}
const generateID = (partyName:string, createDateTime:number)=>{
    return partyName + createDateTime
}

const formatDisplayParty = <DisplayParty>(party:Party)=>{
    return {
        party:party.name,
        dateCreated:moment(party.dateCreated),
        dateUpdated:moment(party.dateUpdated),
        id:party.id,
        type:party.type
    }
}

export {createParty,getParty,formatDisplayParty}