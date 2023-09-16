const { ActivityType } = require('discord.js');
const client = require('..');
const chalk = require('chalk');
const mysql = require('mysql2/promise');
const fs = require('fs');

const config = client.config;
const { EmbedBuilder, WebhookClient } = require('discord.js');
const axios = require("axios");
const colors = require('colors');


client.on("ready", async() => {


	
	console.log(chalk.magentaBright(`
░█████╗░██╗░░░░░░█████╗░██████╗░██████╗░██╗███╗░░██╗
██╔══██╗██║░░░░░██╔══██╗██╔══██╗██╔══██╗██║████╗░██║
███████║██║░░░░░███████║██║░░██║██║░░██║██║██╔██╗██║
██╔══██║██║░░░░░██╔══██║██║░░██║██║░░██║██║██║╚████║
██║░░██║███████╗██║░░██║██████╔╝██████╔╝██║██║░╚███║
╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░╚═════╝░╚═╝╚═╝░░╚══╝`))
	const activities = [
		{ name: `${client.guilds.cache.size} Servers`, type: ActivityType.Listening },
		{ name: `${client.channels.cache.size} Channels`, type: ActivityType.Playing },
		{ name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
		{ name: `Discord.js v14`, type: ActivityType.Competing }
	];

	const status =  [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, config.time.activities * 1000);

	let s = 0;
	setInterval(() => {
		if(s >= status.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, config.time.status * 1000);
	console.log(chalk.red(`Logged in as ${client.user.tag}!`))
});




