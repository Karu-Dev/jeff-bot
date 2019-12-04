module.exports = askThirdQuestion = async message => {
  do {
    let isDone = false;
    const filter = m => m.author.id === message.author.id;
    const reply = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 10000
    });
    let embed = {};
    if (reply.first()) {
      if (parseInt(reply.first().content) > 0) {
        return parseInt(reply.first().content);
      } else {
        embed = {
          color: 15158332,
          author: {
            name: "You're supposed to enter a number, please try again"
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
