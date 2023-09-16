const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType,AttachmentBuilder,ButtonStyle } = require('discord.js');

const client = require("../..")
const config = client.config;
module.exports = {
	name: 'banner',// اسم الأمر
	description: "Display user's banner",// شرح الأمر
	type: ApplicationCommandType.ChatInput,// نوع الأمر
	cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'The banner of the user you want to display.',
            type: ApplicationCommandOptionType.User
        }
    ],
	run: async (client, interaction) => {
        
        const user = interaction.options.get('user')?.user || interaction.user;
  
        const response2 = await fetch(`https://discord.com/api/v10/users/${user.id}`,{
			headers: {
				"Authorization": `Bot ${config.token}`,
			  }});
			const banner = await response2.json();
  
  let banner2 = true;
  const userData = await fetch(`https://japi.rest/discord/v1/user/${user.id}`);
  const { data } = await userData.json();    


    if(data.bannerURL != null) {

        const bannerURL = data.bannerURL;
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${user.username}'s Banner`)
        .setURL(`${bannerURL}`)
        .setImage(`${bannerURL}`)
        .setFooter({text: `Requested by ${user.displayName}`, iconURL: user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
  
      const row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setLabel('banner Link')
          .setStyle(ButtonStyle.Link )
          .setURL(`${bannerURL}`)
        )
  
      interaction.reply({ embeds: [embed], components: [row] })
    

    }else{
        interaction.reply('السيسي بسلم عليك')
    }
  
    }
};
