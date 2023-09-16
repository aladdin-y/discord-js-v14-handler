const { Client, GatewayIntentBits, Partials,EmbedBuilder, Collection ,  ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder} = require('discord.js');
const client = require('../..');
const config = client.config;

module.exports = {
	name: 'avatar',
	description: "To get someone's avatar",
	aliases: ['a'],
	cooldown: 3000,// 1000ms = 1s
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(' ')[1]) || message.member;
   const embed = new EmbedBuilder()
     .setColor("Random")
     .setTitle(`${user.user.username}'s Avatar`)
     .setURL(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
     .setImage(user.user.displayAvatarURL({ dynamic: true, size: 1024 }))
     .setFooter({text: `Requested by ${message.member.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
     .setTimestamp()

   const row = new ActionRowBuilder()
     .addComponents(new ButtonBuilder()
       .setLabel('Avatar Link')
       .setStyle(ButtonStyle.Link)
       .setURL(`${user.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
     )

   message.reply({ embeds: [embed], components: [row] })


       
    
       
	}
};