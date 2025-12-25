const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const math = require('mathjs');

// Load environment variables at the VERY TOP
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Store commands
client.commands = new Collection();

// Use clientReady instead of ready to fix deprecation warning
client.once(Events.ClientReady, readyClient => {
  console.log(`✅ Math Bot logged in as ${readyClient.user.tag}!`);
  console.log('📊 Slash commands are ready to use!');
  
  // Set activity status - COMPATIBLE VERSION
  try {
    // Method 1: Simple activity (most compatible)
    client.user.setActivity('/math | Calculating 2 + 2', { type: 'PLAYING' });
    console.log('🎮 Activity status set successfully!');
  } catch (error) {
    console.error('❌ Failed to set activity:', error);
  }
});

// Import command handlers with correct function names
const { executeMath } = require('./commands/math.js');
const { executeStats } = require('./commands/statistics.js');
const { executeConvert } = require('./commands/convert.js');
const { executeSolve } = require('./commands/solve.js');
const { executeHelp } = require('./commands/help.js');
const { executeArea } = require('./commands/area.js');
const { executePerimeter } = require('./commands/perimeter.js');
const { executeVolume } = require('./commands/volume.js');
const { executeTrigonometry } = require('./commands/trigonometry.js');
const { executeAlgebra } = require('./commands/algebra.js');

// Register commands with correct function names
client.commands.set('math', { execute: executeMath });
client.commands.set('statistics', { execute: executeStats });
client.commands.set('convert', { execute: executeConvert });
client.commands.set('solve', { execute: executeSolve });
client.commands.set('help', { execute: executeHelp });
client.commands.set('area', { execute: executeArea });
client.commands.set('perimeter', { execute: executePerimeter });
client.commands.set('volume', { execute: executeVolume });
client.commands.set('trigonometry', { execute: executeTrigonometry });
client.commands.set('algebra', { execute: executeAlgebra });

// Handle slash commands
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}:`, error);
    
    // Use flags instead of ephemeral for new Discord.js version
    const errorMessage = {
      content: '❌ There was an error while executing this command!',
      flags: 64 // EPHEMERAL
    };
    
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Add token validation
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('❌ DISCORD_TOKEN is missing from environment variables!');
  console.error('💡 Make sure your .env file exists and contains DISCORD_TOKEN=your_token_here');
  process.exit(1);
}

client.login(token).catch(error => {
  console.error('❌ Failed to login:', error.message);
  console.error('💡 Check if your token is correct and the bot has proper permissions');
});
