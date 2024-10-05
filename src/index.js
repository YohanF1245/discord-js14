const { Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildModeration
    ]
});

client.on('ready', () => {
    console.log(`✅Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.content.toLocaleLowerCase() === 'putain' || message.content.toLocaleLowerCase() === 'bite') {
        message.reply('Oh ! Surveilles ton language, '+message.author.displayName+" !");
    }
    if(message.content.toLocaleLowerCase() === 'salut' || message.content.toLocaleLowerCase() === 'bonjour')
        if(!message.author.bot){
            message.reply('Salut, '+message.author.displayName+" !");
        }
    })

client.login('');

