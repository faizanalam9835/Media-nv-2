const db = require("../config/db")

const createcandiates = async(req,res) =>{
    try {
        const { Name, Age, Email, Phone, Skills, Experience, Applied_position } = req.body

        db.query(
          `INSERT INTO Candiates (Name, Age, Email, Phone, Skills, Experience, Aplied_position)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING *`,
          [Name, Age, Email, Phone, Skills, Experience, Applied_position],
          (err, result) => {
            if (err) return res.status(500).json({ error: "Database error", err })
            res.status(201).json(result.rows[0])
          }
        )
        
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
}

const getAllCandidates = (req, res) => {
    db.query(
      `SELECT * FROM Candiates`,
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", err })
        res.json(result.rows)
      }
    )
  }


  const getCandidateById = (req, res) => {
    const { id } = req.params
    db.query(
      `SELECT * FROM Candiates WHERE id = $1`,
      [id],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", err })
        if (result.rows.length === 0) return res.status(404).json({ error: "Candidate not found" })
        res.json(result.rows[0])
      }
    )
  }
  

  const deleteCandidate = (req, res) => {
    const { id } = req.params
  
    db.query(
      `DELETE FROM Candiates
       WHERE id = $1
       RETURNING *`,
      [id],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database error", err })
        if (result.rows.length === 0) return res.status(404).json({ error: "Candidate not found" })
        res.json({ message: "Candidate deleted", candidate: result.rows[0] })
      }
    )
  }
  
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    if (keys.length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const setQuery = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `
      UPDATE Candiates
      SET ${setQuery}
      WHERE id = $${keys.length + 1}
      RETURNING *;
    `;

    const result = await db.query(query, [...values, id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

  
module.exports = {
    createcandiates,
    getAllCandidates,
    getCandidateById,

    deleteCandidate,
    updateCandidate
}