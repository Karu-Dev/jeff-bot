const mysql = require("mysql2/promise");
module.exports = sqlGet = async id => {
  const connection = await mysql.createConnection({
    host: "remotemysql.com",
    user: "Q82r00X2Io",
    password: "vWWKTdj1En",
    database: "Q82r00X2Io",
    port: 3306
  });
  sql = `SELECT * FROM answers WHERE discord_id='${id}'`;
  const results = await connection.query(sql);
  return await results[0][0];
};