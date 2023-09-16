const client = require("../.")
const config = client.config;

module.exports = {
	id: 'ping_btn',
	permissions: [],
	run: async (client, interaction) => {
		await interaction.reply(`ping :**${client.ws.ping} ms**`)	
	}
};
