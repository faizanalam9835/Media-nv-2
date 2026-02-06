require("dotenv").config()
const express = require("express")
const db = require("./config/db")
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
const router = require("./routes/candidate")
const cors = require("cors")


app.use(cors())
db.query("SELECT * FROM Candiates" , (err,result) =>{
    if(err){
        console.log("query error")
        return
    }
    console.log("Database :" , result.rows)
})

app.use("/" , router)
app.listen(PORT , () =>{
    console.log("server running on port :" , PORT)
})

console.log(process.env.HOST)