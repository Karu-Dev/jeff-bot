module.exports = askThirdQuestion = async (message, botMessage) => {
  await botMessage.react("🔴");
  await botMessage.react("🟢");
  await botMessage.react("🔵");
  const reactionFilter = (r, u) =>
    (u.id === message.author.id && r.emoji.name === "🔴") ||
    (u.id === message.author.id && r.emoji.name === "🟢") ||
    (u.id === message.author.id && r.emoji.name === "🔵");
  const reactions = await botMessage.awaitReactions(reactionFilter, {
    max: 1,
    time: 10000
  });
  if (reactions.get("🔴")) {
    return "red";
  }
  if (reactions.get("🟢")) {
    return "green";
  }
  if (reactions.get("🔵")) {
    return "blue";
  }
};
