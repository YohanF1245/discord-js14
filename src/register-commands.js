require('dotenv').config();

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands  = [
    {
        name: 'hey',
        description: 'Reply with hey',
    },
    {
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'first-number',
                description: 'First number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'second-number',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }   
        ]
    }
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Starting adding commands...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('Commands added!');
    }

    catch(error){
        console.error(error);
    }
})();