const { Client, IntentsBitField} = require('discord.js');
require('dotenv').config();

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

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === 'hey'){
        await interaction.reply('Hey !');
    }
    if(interaction.commandName === 'add'){
        const firstNumber = interaction.options.getNumber('first-number');
        const secondNumber = interaction.options.getNumber('second-number');
        await interaction.reply(`${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`);
    }
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


client.login(process.env.TOKEN);    

