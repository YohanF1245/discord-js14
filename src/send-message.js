require('dotenv').config();

const { Client, IntentsBitField, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

const roles= [
    {
        id:'1292427994257817610',
        label:'Green'
    },
    {
        id:'1292427954726633496',
        label:'Red'
    },
    {
        id:'1292427841853456475',
        label:'Blue'
    }
]

client.on('ready', async (c) => {
    try{
        const channel = client.channels.cache.get('1292428961539817543');
        if (!channel) return;
        const row = new ActionRowBuilder();
        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        });

        await channel.send({ 
            content: 'Claim or remove a role below !',
            components: [row],
         });

         process.exit();
    }catch(error){
        console.error(error);
    }   
    console.log(`✅Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);