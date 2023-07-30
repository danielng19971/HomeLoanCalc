 

const info = (message:string)=>{
    const level = "INFO"
    return console.log(getErrorText(level,message))
}
const debug = (message:string)=>{
    const level = "DEBUG"
    return console.log(getErrorText(level,message))
}
const error = (message:string)=>{
    const level = "ERROR"
    return console.log(getErrorText(level,message))
}


const getErrorText = (level:string,message:string) =>{
    return`Log level ${level} - message: ${message}`
}

export default {
    info,debug,error
}