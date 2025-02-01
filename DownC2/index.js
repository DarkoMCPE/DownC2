const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token, clientId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandFolders = fs.readdirSync('./Methods');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Methods/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Methods/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('🎉 ¡Bot encendido y listo!');
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('$') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        const command = client.commands.get(commandName);
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('❌ Hubo un error al ejecutar ese comando.');
    }
});

client.login(token);
