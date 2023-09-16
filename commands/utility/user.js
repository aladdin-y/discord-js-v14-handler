const { Client, GatewayIntentBits, Partials,EmbedBuilder, Collection ,  ButtonBuilder, ActionRowBuilder,ButtonStyle, SlashCommandBuilder} = require('discord.js');
const client = require('../..');
const config = client.config;
const moment = require('moment'); // require

module.exports = {
	name: 'user',
	description: "To get someone's information.",
	aliases: ['u'],
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {

        

              let user = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(' ')[1]) || message.member;
              let roles1 = user.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString()).join(` , `) ;
              
              const userData = await fetch(`https://japi.rest/discord/v1/user/${user.id}`);
              const { data } = await userData.json();    
              


              
              const userEmbed = new EmbedBuilder()
                .setAuthor({name:`${user.user.username}`, iconURL: user.user.displayAvatarURL({dynamic: true, size: 2048})})
                .setThumbnail(`${user.user.displayAvatarURL({dynamic: true})}`)
                .addFields(
                { name: `**user Name : **`,  value:`${user.user.username}`, inline: true},
                { name: `**display name : **`, value: data.global_name || "None", inline: true},
                { name: `**ID : **`,  value:`${user.id}`, inline: true},
             
                { name: `**creation date : **`,  value:`${data.createdAt }`, inline: true},
                { name: `**joinned server sinse : **`, value: `${moment(user.joinedAt).format("DD-YY-YYYY [in] HH:mm")}`, inline: true},
                { name: `**user roles: **`,  value:`${roles1}`, inline: false}
                
                )
                message.reply({embeds:[userEmbed]})
              

	}
};  //{ name: `**has nitro: **`, value: `${netro}`, inline: true},
//  { name: `**game activity : **`, value: `${game || 'None'}`, inline: true},