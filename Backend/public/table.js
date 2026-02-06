const db = require("../config/db")

const candiatesTable = `CREATE TABLE Candiates(
     id SERIAL PRIMARY KEY,
     Name TEXT NOT NULL,
     Age INT ,
     Email TEXT,
     Phone TEXT,
     Skills TEXT,
     Experience INT,
     Aplied_position TEXT,
     status Text DEFAULT 'Applied',
     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`


db.query(candiatesTable , (err) =>{
    if(err){
        console.log("table creation error" , err)
        return
    }

    console.log("Table created")
})
