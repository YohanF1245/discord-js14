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
                choices: [
                    {
                        name: 'One',
                        value: 1
                    },
                    {
                        name: 'Two',
                        value: 2
                    },
                    {
                        name: 'Three',
                        value: 3
                    }
                ],
                required: true
            },
            {
                name: 'second-number',
                description: 'Second number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'One',
                        value: 1
                    },
                    {
                        name: 'Two',
                        value: 2
                    },
                    {
                        name: 'Three',
                        value: 3
                    }
                ],
                required: true
            }   
        ]
    },
    {
        name: 'embed',
        description: 'Sends an embed',
    },
    {
        name: 'whois-that-pokemon',
        description: 'Sends a pokemon embed',
        options: [
            {
                name: 'name',
                description: 'Name of the pokemon',
                type: ApplicationCommandOptionType.String,
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