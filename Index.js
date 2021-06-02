const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "?";

client.once("ready", () => {
    console.log("Bot online!");
    client.user.setActivity("Ticket Bot");
});

client.on('message', async message =>
{

if(message.content === prefix + tickethelp){
const helpembed = new Discord.MessageEmbed() 
.setTitle("Ticket Help")
.setColor("GREEN")
.setField("**" + prefix + "tickethelp**","Sehe die HelpPage")
.setField("**" + prefix + "ticket**","Erstelle ein ticket") 
.setField("**" + prefix + "closd**","Schließe ein Ticket")
message.channel.send(helpembed);
}

if(message.content === prefix + "ticket"){
message.delete()
let role = message.guild.roles.cache.find(r => r.name === "ticket");
message.guild.channels.create("ticket-" + message.author.username, {
permissionOverwrites: [
{
  id: message.author.id,
  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
},
{
  id: role.id,
  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
},
{
  id: message.guild.roles.everyone,
  deny: ["VIEW_CHANNEL"]
}
],
type: 'text'
}).then(async channel => {
const ticketembed = new Discord.MessageEmbed() 
.setTitle("Ticket System")
.setColor("GREEN") 
.setDescription("Dein Ticket wurde erfolgreich erstellt")
channel.send(ticketembed)
}) 
} 
 
  
if(message.content === prefix + "close"){
if(message.channel.name.includes("ticket-")){
if (message.member.permissions.has("KICK_MEMBERS")){
message.channel.delete();
}else{
message.channel.send("Du hast keine Rechte um das Ticket zu schließen");
} 
}else{
message.channel.send("Du kannst das Ticket nur in in einem Ticket channel schließen");
} 
} 
   

});

client.login();
