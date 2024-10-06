require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

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

client.on('ready', () => {
    console.log(`✅Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);