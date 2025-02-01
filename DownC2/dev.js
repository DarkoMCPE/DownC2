const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

const commands = [];
const commandFolders = fs.readdirSync('./Methods');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Methods/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Methods/${folder}/${file}`);
        commands.push(command.data ? command.data.toJSON() : command);
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('🔄 Refrescando los comandos de la aplicación...');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('✅ Comandos de la aplicación refrescados exitosamente.');
    } catch (error) {
        console.error(error);
    }
})();
