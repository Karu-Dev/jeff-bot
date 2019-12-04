# jeff-bot  
Missing an .env file which contains the discord API token. Add this manually. It should contain a single variable "TOKEN".
Foe example `TOKEN=LOLwOTc0JAW1MjY4MzUyXDEw.XeTI2g.KYshLQdVJhlKqxXDubeq9H-PEP0`

`npm start` to launch
## Live
Add the bot to your own server [Here](https://discordapp.com/api/oauth2/authorize?client_id=650974055268352010&permissions=2048&scope=bot "Here")  
Join the bot's dev server [Here](https://discord.gg/HQFDQ5a "Here")
## Commands
There's two simple commands.
One of which is the intended `!jeff` command which starts the dialogue process and the other is a dev command `!reset` to delete the developer's user entries from the database.
## Dialogue
The dialogue is pretty simple and Jeff just asks you a few questions.
> How much money are you looking for? (In EUR)  
>How many weeks will it take you to return the loan?  
>Please pick one... Red, green or blue?  
>Do you have an active bank account?  
>Do you have any credit history?  

The first ones have to be manually entered since they're numbers.
The three that are left are picked by reacting to the message with the coresponding reaction.

After the dialogue is over Jeff takes your answers into consideration and returns a list of imaginary loan givers.
## SQL
Jeff uses MySQL to store user's answers so when he gets called again by the same user in 24h since the call before he already knows your answers. Jeff just goes ahead and serves you your options without asking any questions.

## Preview
![preview](https://cdn.discordapp.com/attachments/650976758933356548/651708859546730507/lV1skn3ByEnWUBk10NCqVXHuRfCmI70LgZgQiTpTlchACQkAICAEhEK4ERJTDNTJilxAQAkJACEQcARHliAu5OCwEhIAQEALhSkB.png "preview")  
After a repeated request within 24h  
![preview](https://cdn.discordapp.com/attachments/650976758933356548/651709008427876352/unknown.png "preview")
