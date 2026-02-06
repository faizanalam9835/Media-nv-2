const {Pool} = require("pg")


const pool = new Pool({
    user:process.env.USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.DB_PORT
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
