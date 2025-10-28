const { REST, Routes } = require('discord.js');
const { commands } = require('./commands/command-list.js');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Started refreshing application (/) commands.');

    // Validate token and client ID
    if (!process.env.DISCORD_TOKEN) {
      throw new Error('DISCORD_TOKEN is missing from environment variables');
    }
    if (!process.env.CLIENT_ID) {
      throw new Error('CLIENT_ID is missing from environment variables');
    }

    // For GUILD commands (instant, only in specific server)
    if (process.env.GUILD_ID) {
      console.log('📁 Registering GUILD-specific commands...');
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
      );
      console.log(`✅ Successfully reloaded ${data.length} GUILD (/) commands.`);
      console.log('🏠 Commands available only in the specified server!');
    } 
    // For GLOBAL commands (takes up to 1 hour to propagate)
    else {
      console.log('🌐 Registering GLOBAL commands...');
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );
      console.log(`✅ Successfully reloaded ${data.length} GLOBAL (/) commands.`);
      console.log('🎯 Commands available globally (may take up to 1 hour to appear everywhere)!');
    }
  } catch (error) {
    console.error('❌ Error refreshing commands:', error);
  }
})();