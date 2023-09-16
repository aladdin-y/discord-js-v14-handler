const fs = require('fs');
const chalk = require('chalk');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const client = require("..")
const config = client.config;

const AsciiTable = require('ascii-table');
const table = new AsciiTable("Aladdin love you").setHeading(' Slash Commands  ', ' Stats ').setBorder('∥', '⩶', "■", "■")

const TOKEN = config.token;
const CLIENT_ID =config.CLIENT_ID;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`../slashCommands/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
					default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
					default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
				});
			
				if(slashCommand.name) {
						client.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '✅')
				} else {
						table.addRow(file.split('.js')[0], '⛔')
				}
		}
		
	});
	console.log(chalk.red(table.toString()));

	(async () => {
			try {
				await rest.put(
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				);
				console.log(chalk.yellow('Slash Commands • Registered'))
			} catch (error) {
				console.log(error);
			}
	})();
};
