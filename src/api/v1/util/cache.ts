const Cache = require('node-cache');
const DBCache = new Cache();
const cacheTimeOut = 10000

 function addCache (cacheId:string,data:any){
         DBCache.set(cacheId, data, cacheTimeOut)
}
 function clearCache(cacheId:string){
    const allKeys = DBCache.keys();
    allKeys.forEach((key:string) => {
     if(key.startsWith(cacheId)) return DBCache.del(key)
     });
}
 function getCache (cacheId:string){
    const out = DBCache.get(cacheId)
    return out;
}

export default {addCache,clearCache,getCache}


