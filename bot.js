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
const { executeHelp, handleSelectMenu, handleModalSubmit, handleHelpButton } = require('./commands/help.js'); // ADDED handleHelpButton
const { executeArea } = require('./commands/area.js');
const { executePerimeter } = require('./commands/perimeter.js');
const { executeVolume } = require('./commands/volume.js');
const { executeTrigonometry } = require('./commands/trigonometry.js');
const { executeAlgebra } = require('./commands/algebra.js');
const { executeComplex } = require('./commands/complex.js');
const { executeBinomial } = require('./commands/binomial.js');

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
client.commands.set('complex', { execute: executeComplex });
client.commands.set('binomial', { execute: executeBinomial });

// SINGLE UNIFIED Interaction Handler
client.on(Events.InteractionCreate, async interaction => {
  try {
    // Handle modal submissions FIRST
    if (interaction.isModalSubmit()) {
      // Handle modal submission from help command
      await handleModalSubmit(interaction);
      return;
    }
    
    // Handle button interactions from help command
    if (interaction.isButton()) {
      // Check if this is a help command button
      const helpButtonIds = [
        'search_command', 'main_menu', 'categories_menu', 'view_all_commands',
        'prev_page', 'next_page', 'search_command'
      ];
      
      // Check if it starts with any help-related prefix
      if (interaction.customId.startsWith('select_command_') || 
          interaction.customId.startsWith('category_') ||
          helpButtonIds.includes(interaction.customId)) {
        await handleHelpButton(interaction);
        return;
      }
      // Other button interactions are handled within each command's collector
      return;
    }
    
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      // Execute the command
      await command.execute(interaction);
    }
    // Handle select menus (for help command search)
    else if (interaction.isStringSelectMenu()) {
      await handleSelectMenu(interaction);
    }
  } catch (error) {
    console.error(`Error handling interaction ${interaction.type}:`, error);
    
    // Only send error if interaction hasn't been replied to
    if (!interaction.replied && !interaction.deferred) {
      try {
        await interaction.reply({
          content: '❌ There was an error while processing your request!',
          flags: 64 // Use flags instead of ephemeral
        });
      } catch (replyError) {
        console.error('Failed to send error message:', replyError);
      }
    } else if (interaction.deferred && !interaction.replied) {
      // If deferred but not replied, we can still edit
      try {
        await interaction.editReply({
          content: '❌ There was an error while processing your request!'
        });
      } catch (editError) {
        console.error('Failed to edit error message:', editError);
      }
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

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
