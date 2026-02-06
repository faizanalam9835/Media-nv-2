const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
})

const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log("PostgreSQL connected")
    client.release()
  } catch (error) {
    console.log("DB CONNECTION ERROR:", error.message)
  }
}

connectDB()

module.exports = pool
