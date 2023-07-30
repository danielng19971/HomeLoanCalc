//Import
require('dotenv').config({path:'./env/dev.env'})
import server from './server'

//PORT 
const PORT = process.env.PORT_NUMBER||5000

server.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`)
})