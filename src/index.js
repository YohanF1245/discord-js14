const { Client, IntentsBitField, EmbedBuilder} = require('discord.js');
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
    if(interaction.commandName === 'embed'){
        const embed = new EmbedBuilder()
            .setTitle('Embed title')
            .setColor('Random')
            .setDescription('Embed description')
            .addFields(
                {name: 'Field 1', value: 'Field 1 value'},
                {name: 'Field 2', value: 'Field 2 value'}
            )
            .setURL('https://discord.js.org/')
        await interaction.reply({embeds: [embed]})
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

