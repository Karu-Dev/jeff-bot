module.exports = askSecondQuestion = async message => {
  do {
    const filter = m => m.author.id === message.author.id;
    const reply = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 10000
    });
    if (reply.first()) {
      if (parseInt(reply.first().content) > 0) {
        return parseInt(reply.first().content);
      } else {
        embed = {
          color: 15158332,
          author: {
            name:
              "You're supposed to enter a number greater than 0, please try again"
          }
        };
        message.channel.send({ embed });
      }
    } else {
      message.reply("You've been timed out.");
      return "timeout";
    }
  } while (1);
};
