import database from "infra/database.js";

async function status(req, res) {
  console.log(database);
  const result = await database.query("SELECT 1 + 1 as sum; ");

  console.log("Database query result:", result.rows);
  res.status(200).json({ message: "API is running" });
}

export default status;
