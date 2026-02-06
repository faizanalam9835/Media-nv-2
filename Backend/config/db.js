const {Pool} = require("pg")


const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"testDb",
    password:"Faizan@2005",
    port:5432
})

pool.connect((err, client , release) =>{
    if(err){
        console.log("error while connecting")
        return 
    }
    console.log("PostgreSQL connected")
    release()
})

module.exports = pool
