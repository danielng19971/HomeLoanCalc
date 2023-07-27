//Import
const express = require('express');
require('dotenv').config()

//declaration
const PORT_NUMBER = process.env.PORT_NUMBER
const app = express();

app.listen(PORT_NUMBER,()=>{
    console.log(`Listening on port: ${PORT_NUMBER}`)
})