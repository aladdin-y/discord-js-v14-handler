const { Client, GatewayIntentBits, Partials, Collection ,EmbedBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction, Partials.guildMemberAdd, ] 
});
const config = require('./config.js');
const fs = require("fs")
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.buttons = new Collection();
client.config = config;
client.prefix = config.prefix;
let db = require('./db.js');


const pool = mysql.createPool({
	host: config.db.ip,
	user: config.db.hn,
	password: config.db.dp,
	database: config.db.dn
  });
  client.pool = pool;
  client.db = db;


	const keepAlive = require('./keepAlive.js')
keepAlive()
module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(config.token)
