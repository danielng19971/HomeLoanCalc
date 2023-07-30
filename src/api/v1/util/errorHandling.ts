import logger from "./logger"
const notFound = (message:string)=>{
    logger.error(message)
    throw {message, code:404}
}
const partyExistErr = (party:string)=>{
    
    const message = `Party ${party} exists`
    logger.error(message)
    throw {message, code:400}
}



export {notFound,partyExistErr}