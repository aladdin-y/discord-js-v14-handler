const { Client, GatewayIntentBits, Partials,EmbedBuilder, Collection ,  ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder} = require('discord.js');
const client = require('../..');
const config = client.config;

module.exports = {
	name: 'banner',
	description: "To get someone's banner",
	aliases: ['b'],
	cooldown: 3000,// 1000 = 1
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		let user = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(' ')[1]) || message.member;

		let banner = false;
		await user.user.fetch().then(user => {
		  if (user.banner) {
			banner = user.bannerURL({ dynamic: true, size: 1024 })

			
		  }

		})
		if (banner === false) return message.reply(`** This user \`${user.user.username}\` don't have banner !**`);
	
		const embed = new EmbedBuilder()
		  .setColor("Random")
		  .setTitle(`${user.user.username}'s Banner`)
		  .setURL(`${banner}`)
		  .setImage(`${banner}`)
		  .setFooter({text: `Requested by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
		  .setTimestamp()
	
		const row = new ActionRowBuilder()
		  .addComponents(new ButtonBuilder()
			.setLabel('banner Link')
			.setStyle(ButtonStyle.Link )
			.setURL(`${user.user.bannerURL({ dynamic: true, size: 1024 })}`)
		  )
	
		message.reply({ embeds: [embed], components: [row] })
	  



       
    
       
	}
};