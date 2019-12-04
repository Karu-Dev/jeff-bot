const mysql = require("mysql2/promise");
module.exports = sqlDelete = async id => {
  const connection = await mysql.createConnection({
    host: "remotemysql.com",
    user: "Q82r00X2Io",
    password: "vWWKTdj1En",
    database: "Q82r00X2Io",
    port: 3306
  });
  sql = `DELETE FROM answers WHERE discord_id='${id}'`;
  await connection.query(sql);
};