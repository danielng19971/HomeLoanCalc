import z from 'zod'
import firebase from '../../../config/firebase'
import { handleZodError } from '../util/errorHandling'
import {Cache,DateTime} from "../util/index"
import { Query } from './index'

export class CreateCollection{
    schema: z.Schema
    collection: Collection
    connection: any

    constructor(schema: z.Schema, collection: Collection) {
        this.schema = schema
        this.collection = collection
        this.connection = firebase.collection(collection.name)
    }
    public async createCollection() {
        try {
            await this.collection.update(this.schema)
            return this.collection
        } catch (e: any) {
            throw e
        }

    }

}
export abstract class GetCollection {
    dbCollection:any
    collectionName :string
    cache:boolean
    collections:Array<Collection>
    queries : Array<Query>
    cacheId : string

    constructor(collectionName:string,cache:boolean){
        this.dbCollection = firebase.collection(collectionName)
        this.collectionName =collectionName
        this.cache = cache
        this.collections = []
        this.queries = []
        this.cacheId = ""
    }
    public setQuery (property:string,comparator:string,value:any){
        this.queries.push({property,comparator,value})
        this.dbCollection = this.dbCollection.where(property,comparator,value)
        return this
    }
    public async getData(){
        this.setCacheId()
            try {
                const cache = Cache.getCache(this.cacheId)
                if(cache) return cache
                const collections = await this.dbCollection.get()
                //let objs: Array<Collection> = [];
                if (collections._size > 0) {
                    collections.forEach((data: any) => {
                        this.collections.push(data.data())
                    });   
                    if(this.cache){
                        this.cacheData()
                    }
                    return this.collections
                } else {
                    return undefined;
                }
            } catch (e: any) {
                throw e
            }
    }
    private cacheData() {
        Cache.addCache(this.cacheId,this.collections)
    }
    private getQueryString():string{
        let retVal = ""
        this.queries.forEach((query:Query)=>{
            retVal = retVal+query.property+query.comparator+query.value
        })
        return retVal
    }
    private setCacheId(){
        this.cacheId = this.collectionName + "-" + this.getQueryString()
    }

}
export class Collection {
    createDateTime: number
    updateDateTime: number
    updateUser: string
    id: string
    name :string
    
    constructor(name:string){
    this.createDateTime = DateTime.getCurrentTimeStamp()
    this.updateDateTime = DateTime.getCurrentTimeStamp()
    this.updateUser= "default" 
    this.name = name
    this.id = this.generateId()
    }
    private generateId(){
        return this.name + this.createDateTime
    }
    public async update(collectionSchema: z.Schema){
        try {
            this.validateSchema(collectionSchema)
            let obj = {...this} as any
            delete obj['name'];
            await firebase.collection(this.name).doc(this.id).set(obj);
            Cache.clearCache(this.name)
            return this
        } catch (e: any) {
            throw e
        }

    }
    private validateSchema(collectionSchema: z.Schema){
        const result = collectionSchema.safeParse(this)
        if (!result.success) {
            throw (handleZodError(result.error.issues[0], 400))
        } else {
            return true;
        }
    }

}