const { Client } = require("discord.js");
const { config } = require("dotenv");
const askFirstQuestion = require("./src/firstQuestion");
const askSecondQuestion = require("./src/secondQuestion");
const askThirdQuestion = require("./src/thirdQuestion");
const askBoolQuestion = require("./src/boolQuestion");
const sqlDelete = require("./src/sql/sqlDelete");
const sqlGet = require("./src/sql/sqlGet");
const sqlAdd = require("./src/sql/sqlAdd");
const results = require("./src/results");
const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const client = new Client({
  disableEveryone: true
});
config({
  path: __dirname + "/.env"
});
client.on("ready", () => {
  client.user.setPresence({
    status: "online",
    game: {
      name: "Jeff Bot"
    }
  });
});

client.on("message", async message => {
  if (message.content === "!jeff") {
    let botMessage;
    let scoreResults = {};
    let isAnswerSaved = false;
    const savedAnswers = await sqlGet(message.author.id.toString());
    if (savedAnswers) {
      const timeThen = new Date(savedAnswers.ts).getTime();
      const timeNow = new Date().getTime();
      if (timeNow - timeThen <= 86400000) {
        isAnswerSaved = true;
        scoreResults = results(
          savedAnswers.first_answer,
          savedAnswers.second_answer,
          savedAnswers.third_answer,
          savedAnswers.fourth_answer,
          savedAnswers.fifth_answer
        );
      } else {
        sqlDelete(message.author.id.toString());
      }
    }
    if (!isAnswerSaved) {
      let greetingEmbed = {
        color: 15769883,
        thumbnail: {
          url:
            "https://www.wikihow.com/images/thumb/3/34/Become-a-Congressperson-Step-12.jpg/aid9172926-v4-728px-Become-a-Congressperson-Step-12.jpg"
        },
        fields: [
          {
            name: "Hi, I'm Jeff!",
            value:
              "It is great to meet you! I am here to help finding the best loan deals on the market just for you To do it, I have just few simple questions. Let's get started!"
          },
          {
            name: "You have 60 seconds to reply to each question.",
            value: "...or you will have to do it all over again "
          }
        ]
      };
      message.channel.send({ embed: greetingEmbed });
      let embed = {
        color: 15769883,
        author: {
          name: "How much money are you looking for? (In EUR)",
          icon_url:
            "https://media.discordapp.net/attachments/650976758933356548/651412230553731083/9k.png"
        }
      };
      await message.channel.send({ embed });
      const firstQuestionResponse = await askFirstQuestion(message);
      if (firstQuestionResponse === "timeout") {
        return;
      }
      embed = {
        color: 15769883,
        author: {
          name: "How many weeks will it take you to return the loan?",
          icon_url:
            "https://freeiconshop.com/wp-content/uploads/edd/calendar-flat.png"
        }
      };
      message.channel.send({ embed });
      const secondQuestionResponse = await askSecondQuestion(message);
      if (secondQuestionResponse === "timeout") {
        return;
      }
      embed = {
        color: 15769883,
        author: {
          name: "Please pick one... Red, green or blue?",
          icon_url:
            "https://cdn.discordapp.com/attachments/650976758933356548/651413311912542218/color-512.png"
        }
      };
      botMessage = await message.channel.send({ embed });
      const thirdQuestionResponse = await askThirdQuestion(message, botMessage);
      if (thirdQuestionResponse === "timeout") {
        return;
      }
      embed = {
        color: 15769883,
        author: {
          name: "Do you have an active bank account?",
          icon_url:
            "https://cdn.discordapp.com/attachments/650976758933356548/651414008888426509/imgbin-bank-account-computer-icons-bank-bqj0q8JbaW0Y58Rv2j55y3Jde.png"
        }
      };
      botMessage = await message.channel.send({ embed });
      const fourthQuestionResponse = await askBoolQuestion(message, botMessage);
      if (fourthQuestionResponse === "timeout") {
        return;
      }
      embed = {
        color: 15769883,
        author: {
          name: "Do you have any credit history?",
          icon_url:
            "https://icon-library.net/images/expired-icon/expired-icon-11.jpg"
        }
      };
      botMessage = await message.channel.send({ embed });
      const fifthQuestionResponse = await askBoolQuestion(message, botMessage);
      if (fifthQuestionResponse === "timeout") {
        return;
      }
      scoreResults = results(
        firstQuestionResponse,
        secondQuestionResponse,
        thirdQuestionResponse,
        fourthQuestionResponse,
        fifthQuestionResponse
      );

      sqlAdd(
        message.author.id,
        firstQuestionResponse,
        secondQuestionResponse,
        thirdQuestionResponse,
        fourthQuestionResponse,
        fifthQuestionResponse
      );
    }
    let fields = [];
    for (const key of Object.keys(scoreResults)) {
      fields.push({
        name: "💰 **" + capitalize(scoreResults[key].name) + "**",
        value: `[Link to loan](${scoreResults[key].link})`,
        inline: true
      });
    }
    embed = {
      color: 35125,
      author: {
        name: "Available options"
      },
      fields: fields[0]
        ? fields
        : [
            {
              name: "Sorry but there's no available options.",
              value: "Please try again tomorrow."
            }
          ]
    };
    message.channel.send({ embed });
  }
});

client.login(process.env.TOKEN);
