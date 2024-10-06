const { Client, IntentsBitField, EmbedBuilder, messageLink} = require('discord.js');
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
    if(interaction.commandName === 'whois-that-pokemon'){
        const emojiTypes = {
            "Acier": "🛡️",
            "Combat": "🥋",
            "Dragon": "🐉",
            "Eau": "💧",
            "Électrique": "⚡",
            "Feu": "🔥",
            "Fée": "🧚",
            "Glace": "❄️",
            "Insecte": "🐛",
            "Normal": "⚪",
            "Plante": "🌿",
            "Poison": "☠️",
            "Psy": "🌀",
            "Roche": "🪨",
            "Sol": "🌍",
            "Spectre": "👻",
            "Ténèbres": "🌑",
            "Vol": "🕊️"
        };
        const name = interaction.options.getString('name');
        const embed = new EmbedBuilder();
        async function getPokemon(name){
            const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${name}`);
            const data = await response.json();
            return data;
        }
        const pokemon = await getPokemon(name);
        if(pokemon.status === 404){
            embed.setTitle('Pokemon not found')
        }else{
            embed.setTitle(pokemon.pokedex_id + ' - ' + pokemon.name.fr)
                .setDescription(pokemon.category)
                .setImage(pokemon.sprites.regular)
                
        }
        embed.addFields(
            {name: "Types:", value: ' '},
        )
        pokemon.types.forEach(types => {
            embed.addFields({name:""+emojiTypes[types.name], value: " ", inline: true})
        })
        embed.addFields(
            {name: "Talents:", value: ' '},
        )
        pokemon.talents.forEach(talents => {
            const coloredText = talents.tc ? "🔴" : "🟢";
            embed.addFields({name:""+coloredText+" "+talents.name, value: " ", inline: true});
        });
        embed.addFields(
            {name: "Statistiques :", value: ' '},
            {name: 'HP', value: ""+pokemon.stats.hp, inline: true},
            {name: 'Attaque', value: ""+pokemon.stats.atk, inline: true},
            {name: 'Défense', value: ""+pokemon.stats.def, inline: true},
            {name: 'Attaque Spéciale', value: ""+pokemon.stats.spe_atk, inline: true},
            {name: 'Défense Spéciale', value: ""+pokemon.stats.spe_def, inline: true},
            {name: 'Vitesse', value: ""+pokemon.stats.vit, inline: true},
        );

    interaction.reply({embeds: [embed]});
    }
    if(interaction.isButton()){
        console.log(interaction.customId);
    }
});

client.on('messageCreate', (message) => {
    if (message.content.toLocaleLowerCase().replace(/\s/g, '').includes('putain') || message.content.toLocaleLowerCase() === 'putain' || message.content.toLocaleLowerCase() === 'bite') {
        message.reply('Oh ! Surveilles ton language, '+message.author.displayName+" !");
        message.delete();
    }
    if(message.content.toLocaleLowerCase() === 'salut' || message.content.toLocaleLowerCase() === 'bonjour')
        if(!message.author.bot){
            message.reply('Salut, '+message.author.displayName+" !");
        }
    })


client.login(process.env.TOKEN);    

