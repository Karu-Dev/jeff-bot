const mysql = require("mysql2/promise");
module.exports = sqlAdd = async (
  discordId,
  firstAnswer,
  secondAnswer,
  thirdAnswer,
  fourthAnswer,
  fifthAnswer
) => {
  const connection = await mysql.createConnection({
    host: "remotemysql.com",
    user: "Q82r00X2Io",
    password: "vWWKTdj1En",
    database: "Q82r00X2Io",
    port: 3306
  });
  const values = [
    [
      discordId,
      firstAnswer,
      secondAnswer,
      thirdAnswer,
      fourthAnswer,
      fifthAnswer
    ]
  ];
  sql = `INSERT INTO answers (discord_id, first_answer, second_answer, third_answer, fourth_answer, fifth_answer) VALUES (?)`;
  await connection.query(sql, values).catch(err => console.log(err));
};
