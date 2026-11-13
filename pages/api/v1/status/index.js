import database from "infra/database.js";

async function status(req, res) {
  const databaseName = process.env.POSTGRES_DB;
  const updatedAt = new Date().toISOString();
  const serverVersion = await database.query("SHOW server_version");
  const serverVersionValue = serverVersion.rows[0].server_version;
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int as opened_connections FROM pg_stat_activity WHERE state = 'active' AND datname= $1;",
    values: [databaseName],
  });
  const openedConnectionsValue =
    openedConnectionsResult.rows[0].opened_connections;
  // const result = await database.query(
  //   `SELECT server_version,
  //   count(*)::int as opened_connections,
  //   max_connections::int
  //   FROM pg_stat_activity
  //    WHERE state = 'active'
  //   `,
  // );
  const result = await database
    .query("SHOW server_version")
    .catch((e) => res.status(500).message(e));
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        opened_connections: openedConnectionsValue,
        max_connections: maxConnectionsValue,
        version: serverVersionValue,
      },
    },
  });
}

export default status;
