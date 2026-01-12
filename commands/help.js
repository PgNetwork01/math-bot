const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

const COMMANDS_PER_PAGE = 5;
let currentPage = 0;

// All commands with details
const allCommands = [
  {
    name: 'math',
    description: 'Perform basic mathematical calculations',
    usage: '/math expression:<expression>',
    examples: ['`/math expression:2+2*5`', '`/math expression:sin(45)*sqrt(16)`', '`/math expression:2*pi*5^2`'],
    category: 'Basic',
    emoji: '🧮'
  },
  {
    name: 'statistics',
    description: 'Calculate statistical measures for a set of numbers',
    usage: '/statistics numbers:<number list>',
    examples: ['`/statistics numbers:1 2 3 4 5`', '`/statistics numbers:10,20,30,40,50`'],
    category: 'Statistics',
    emoji: '📊'
  },
  {
    name: 'convert',
    description: 'Convert between different units',
    usage: '/convert value:<number> from:<unit> to:<unit>',
    examples: ['`/convert value:100 from:cm to:m`', '`/convert value:32 from:fahrenheit to:celsius`'],
    category: 'Conversion',
    emoji: '🔄'
  },
  {
    name: 'solve',
    description: 'Solve mathematical equations',
    usage: '/solve equation:<equation>',
    examples: ['`/solve equation:2*x + 5 = 13`', '`/solve equation:x^2 - 4 = 0`'],
    category: 'Algebra',
    emoji: '🔍'
  },
  {
    name: 'area',
    description: 'Calculate area of geometric shapes',
    usage: '/area <shape> <parameters>',
    examples: ['`/area circle radius:5`', '`/area triangle base:10 height:8`', '`/area triangle-heron a:3 b:4 c:5`'],
    category: 'Geometry',
    emoji: '📐'
  },
  {
    name: 'perimeter',
    description: 'Calculate perimeter/circumference of shapes',
    usage: '/perimeter <shape> <parameters>',
    examples: ['`/perimeter circle radius:5`', '`/perimeter triangle a:3 b:4 c:5`'],
    category: 'Geometry',
    emoji: '📏'
  },
  {
    name: 'volume',
    description: 'Calculate volume of 3D shapes',
    usage: '/volume <shape> <parameters>',
    examples: ['`/volume cube side:5`', '`/volume sphere radius:3`', '`/volume cylinder radius:2 height:10`'],
    category: 'Geometry',
    emoji: '🧊'
  },
  {
    name: 'trigonometry',
    description: 'Trigonometric calculations',
    usage: '/trigonometry <operation> <parameters>',
    examples: ['`/trigonometry sin angle:30`', '`/trigonometry pythagoras find:hypotenuse a:3 b:4`'],
    category: 'Trigonometry',
    emoji: '📐'
  },
  {
    name: 'algebra',
    description: 'Algebraic operations and calculations',
    usage: '/algebra <operation> <parameters>',
    examples: ['`/algebra quadratic a:1 b:-3 c:2`', '`/algebra distance x1:0 y1:0 x2:3 y2:4`'],
    category: 'Algebra',
    emoji: '➗'
  }
];

// Categories for organization
const categories = {
  'Basic': { emoji: '🧮', description: 'Basic mathematical operations' },
  'Geometry': { emoji: '📐', description: 'Area, perimeter, volume calculations' },
  'Algebra': { emoji: '➗', description: 'Equations and algebraic operations' },
  'Statistics': { emoji: '📊', description: 'Statistical analysis' },
  'Trigonometry': { emoji: '📐', description: 'Trigonometric functions' },
  'Conversion': { emoji: '🔄', description: 'Unit conversions' }
};

async function executeHelp(interaction) {
  try {
    // Reset current page to 0 when starting fresh
    currentPage = 0;
    
    // Create initial embed
    const embed = createMainEmbed();
    const components = createInitialComponents();
    
    // Send initial message
    const response = await interaction.reply({
      embeds: [embed],
      components: components,
      fetchReply: true
    });
    
    // Create collector for button interactions
    const collector = response.createMessageComponentCollector({ 
      time: 300000, // 5 minutes
      filter: i => i.user.id === interaction.user.id
    });
    
    collector.on('collect', async (i) => {
      await handleHelpButton(i, response);
    });
    
    collector.on('end', () => {
      try {
        const disabledComponents = disableAllComponents(components);
        response.edit({ components: disabledComponents }).catch(() => {});
      } catch (error) {
        // Ignore errors
      }
    });
    
  } catch (error) {
    console.error('Error in executeHelp:', error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '❌ There was an error displaying the help menu.',
        ephemeral: true
      });
    }
  }
}

// Handle button interaction - now exported and can be called from bot.js
async function handleHelpButton(interaction, originalMessage = null) {
  try {
    // Check if this is a search command - handle differently
    if (interaction.customId === 'search_command') {
      // Show search modal without deferring
      await showSearchModal(interaction);
      return;
    }
    
    // For all other buttons, defer and update
    if (originalMessage) {
      // This is from the main help menu (has collector)
      await interaction.deferUpdate();
    } else {
      // This is from a modal result or standalone button
      await interaction.deferReply({ ephemeral: true });
    }
    
    switch (interaction.customId) {
      case 'prev_page':
        if (currentPage > 0) currentPage--;
        if (originalMessage) {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        } else {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        }
        break;
        
      case 'next_page':
        const maxPage = Math.ceil(allCommands.length / COMMANDS_PER_PAGE) - 1;
        if (currentPage < maxPage) currentPage++;
        if (originalMessage) {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        } else {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        }
        break;
        
      case 'main_menu':
        currentPage = 0;
        if (originalMessage) {
          await interaction.editReply({
            embeds: [createMainEmbed()],
            components: createInitialComponents()
          });
        } else {
          await interaction.editReply({
            embeds: [createMainEmbed()],
            components: createInitialComponents()
          });
        }
        break;
        
      case 'categories_menu':
        if (originalMessage) {
          await interaction.editReply({
            embeds: [createCategoriesEmbed()],
            components: createCategoriesComponents()
          });
        } else {
          await interaction.editReply({
            embeds: [createCategoriesEmbed()],
            components: createCategoriesComponents()
          });
        }
        break;
        
      case 'view_all_commands':
        currentPage = 0;
        if (originalMessage) {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        } else {
          await interaction.editReply({
            embeds: [createCommandListEmbed()],
            components: createPaginationComponents()
          });
        }
        break;
        
      default:
        if (interaction.customId.startsWith('select_command_')) {
          const commandName = interaction.customId.replace('select_command_', '');
          const command = allCommands.find(cmd => cmd.name === commandName);
          if (command) {
            if (originalMessage) {
              await interaction.editReply({
                embeds: [createCommandDetailEmbed(command)],
                components: createCommandDetailComponents()
              });
            } else {
              await interaction.editReply({
                embeds: [createCommandDetailEmbed(command)],
                components: createCommandDetailComponents()
              });
            }
          }
        } else if (interaction.customId.startsWith('category_')) {
          const category = interaction.customId.replace('category_', '');
          const categoryCommands = allCommands.filter(cmd => cmd.category === category);
          
          if (categoryCommands.length > 0) {
            if (originalMessage) {
              await interaction.editReply({
                embeds: [createCategoryCommandsEmbed(category)],
                components: createCategoryCommandsComponents(category)
              });
            } else {
              await interaction.editReply({
                embeds: [createCategoryCommandsEmbed(category)],
                components: createCategoryCommandsComponents(category)
              });
            }
          }
        }
        break;
    }
  } catch (error) {
    console.error('Error handling button interaction:', error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '❌ There was an error processing your request.',
        ephemeral: true
      }).catch(() => {});
    } else {
      await interaction.reply({
        content: '❌ There was an error processing your request.',
        ephemeral: true
      }).catch(() => {});
    }
  }
}

// Show search modal
async function showSearchModal(interaction) {
  try {
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('search_command_modal')
      .setTitle('🔍 Search Command');

    // Create the text input components
    const commandInput = new TextInputBuilder()
      .setCustomId('command_name_input')
      .setLabel('Enter command name')
      .setPlaceholder('e.g., math, solve, area...')
      .setStyle(TextInputStyle.Short)
      .setRequired(true)
      .setMaxLength(50)
      .setMinLength(1);

    // Add inputs to the modal
    const firstActionRow = new ActionRowBuilder().addComponents(commandInput);
    modal.addComponents(firstActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  } catch (error) {
    console.error('Error showing search modal:', error);
    // If we can't show the modal, show an error message
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '❌ Unable to open search modal. Please try again.',
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: '❌ Unable to open search modal. Please try again.',
        ephemeral: true
      });
    }
  }
}

// Handle modal submission
async function handleModalSubmit(interaction) {
  if (!interaction.isModalSubmit()) return false;
  
  // Only handle our search modal
  if (interaction.customId !== 'search_command_modal') return false;
  
  try {
    // Get the command name from the modal
    const commandName = interaction.fields.getTextInputValue('command_name_input').toLowerCase().trim();
    
    // Check if input is empty
    if (!commandName) {
      await interaction.reply({
        content: '❌ Please enter a command name to search.',
        ephemeral: true
      });
      return true;
    }
    
    // Find exact match first
    const exactMatch = allCommands.find(cmd => cmd.name.toLowerCase() === commandName);
    
    if (exactMatch) {
      // Show command details
      await interaction.reply({
        embeds: [createCommandDetailEmbed(exactMatch)],
        components: createCommandDetailComponents(),
        ephemeral: true
      });
      return true;
    }
    
    // Find partial matches
    const partialMatches = allCommands.filter(cmd => 
      cmd.name.toLowerCase().includes(commandName) ||
      cmd.description.toLowerCase().includes(commandName) ||
      cmd.category.toLowerCase().includes(commandName)
    );
    
    if (partialMatches.length === 0) {
      // No matches found
      const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('🔍 No Results Found')
        .setDescription(`No commands found matching "${commandName}".`)
        .addFields({
          name: '💡 Tips',
          value: '• Try searching for a different term\n• Check the spelling\n• Use the "Browse Categories" or "View All Commands" buttons'
        });
      
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
        components: [
          new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('main_menu')
                .setLabel('🏠 Main Menu')
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('view_all_commands')
                .setLabel('📋 View All Commands')
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId('search_command')
                .setLabel('🔍 Try Again')
                .setStyle(ButtonStyle.Success)
            )
        ]
      });
      return true;
    }
    
    // Show partial matches
    if (partialMatches.length === 1) {
      // If only one match, show it directly
      await interaction.reply({
        embeds: [createCommandDetailEmbed(partialMatches[0])],
        components: createCommandDetailComponents(),
        ephemeral: true
      });
      return true;
    }
    
    // Multiple matches found
    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('🔍 Search Results')
      .setDescription(`Found ${partialMatches.length} command(s) matching "${commandName}":`)
      .setFooter({ text: 'Click on a command button below to view details' });
    
    partialMatches.forEach((cmd, index) => {
      embed.addFields({
        name: `${cmd.emoji} /${cmd.name}`,
        value: `${cmd.description}\n**Category:** ${cmd.category}`,
        inline: false
      });
    });
    
    // Create buttons for each command
    const rows = [];
    for (let i = 0; i < partialMatches.length; i += 5) {
      const row = new ActionRowBuilder();
      const chunk = partialMatches.slice(i, i + 5);
      
      chunk.forEach(cmd => {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`select_command_${cmd.name}`)
            .setLabel(`/${cmd.name}`)
            .setEmoji(cmd.emoji)
            .setStyle(ButtonStyle.Secondary)
        );
      });
      
      rows.push(row);
    }
    
    // Add navigation row
    const navRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('main_menu')
          .setLabel('🏠 Main Menu')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('search_command')
          .setLabel('🔍 New Search')
          .setStyle(ButtonStyle.Primary)
      );
    
    rows.push(navRow);
    
    await interaction.reply({
      embeds: [embed],
      components: rows,
      ephemeral: true
    });
    
    return true;
    
  } catch (error) {
    console.error('Error handling modal submission:', error);
    
    // Try to send an error message
    try {
      await interaction.reply({
        content: '❌ There was an error processing your search. Please try again.',
        ephemeral: true
      });
    } catch (replyError) {
      console.error('Could not send error message:', replyError);
    }
    
    return true;
  }
}

// Handle select menu interaction
async function handleSelectMenu(interaction) {
  if (!interaction.isStringSelectMenu()) return;
  
  if (interaction.customId === 'command_search_select') {
    try {
      await interaction.deferUpdate();
      const selectedCommand = interaction.values[0];
      const command = allCommands.find(cmd => cmd.name === selectedCommand);
      
      if (command) {
        await interaction.editReply({
          embeds: [createCommandDetailEmbed(command)],
          components: createCommandDetailComponents()
        });
      }
    } catch (error) {
      console.error('Error handling select menu:', error);
      await interaction.followUp({
        content: '❌ There was an error displaying the command details.',
        ephemeral: true
      }).catch(() => {});
    }
  }
}

// Helper function to disable all components
function disableAllComponents(components) {
  return components.map(row => {
    const newRow = new ActionRowBuilder();
    row.components.forEach(component => {
      if (component.data.type === 2) { // Button
        newRow.addComponents(
          ButtonBuilder.from(component).setDisabled(true)
        );
      } else if (component.data.type === 3) { // Select menu
        newRow.addComponents(
          StringSelectMenuBuilder.from(component).setDisabled(true)
        );
      }
    });
    return newRow;
  });
}

// Embed creation functions
function createMainEmbed() {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('🤖 Math Bot - Interactive Help')
    .setDescription('Welcome to the Math Bot help system! I can help you with various mathematical calculations.')
    .addFields(
      { name: '📚 Quick Stats', value: `**Total Commands:** ${allCommands.length}\n**Categories:** ${Object.keys(categories).length}\n**Ready to calculate!**`, inline: false },
      { name: '🚀 Getting Started', value: 'Use the buttons below to navigate through commands or search for specific commands.', inline: false },
      { name: '🔍 Search Feature', value: 'Click the "Search Commands" button to open a search box where you can type any command name to find it quickly!', inline: false }
    )
    .setFooter({ text: 'Math Bot | Use buttons to navigate' })
    .setTimestamp();
}

function createCommandListEmbed() {
  const start = currentPage * COMMANDS_PER_PAGE;
  const end = start + COMMANDS_PER_PAGE;
  const pageCommands = allCommands.slice(start, end);
  
  const embed = new EmbedBuilder()
    .setColor(0x00FF00)
    .setTitle(`📋 All Commands (Page ${currentPage + 1}/${Math.ceil(allCommands.length / COMMANDS_PER_PAGE)})`)
    .setDescription('Here are all available commands:');
  
  pageCommands.forEach(cmd => {
    embed.addFields({
      name: `${cmd.emoji} /${cmd.name}`,
      value: `${cmd.description}\n**Usage:** \`${cmd.usage}\``,
      inline: false
    });
  });
  
  embed.setFooter({ text: `Showing ${start + 1}-${Math.min(end, allCommands.length)} of ${allCommands.length} commands` });
  
  return embed;
}

function createCategoriesEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0xFFA500)
    .setTitle('📂 Command Categories')
    .setDescription('Browse commands by category:');
  
  Object.entries(categories).forEach(([category, info]) => {
    const categoryCommands = allCommands.filter(cmd => cmd.category === category);
    embed.addFields({
      name: `${info.emoji} ${category}`,
      value: `${info.description}\n**Commands:** ${categoryCommands.length}`,
      inline: true
    });
  });
  
  embed.setFooter({ text: 'Click a button to view commands in that category' });
  
  return embed;
}

function createCategoryCommandsEmbed(categoryName) {
  const categoryCommands = allCommands.filter(cmd => cmd.category === categoryName);
  const categoryInfo = categories[categoryName];
  
  const embed = new EmbedBuilder()
    .setColor(0x8A2BE2)
    .setTitle(`${categoryInfo.emoji} ${categoryName} Commands`)
    .setDescription(categoryInfo.description);
  
  categoryCommands.forEach(cmd => {
    embed.addFields({
      name: `${cmd.emoji} /${cmd.name}`,
      value: cmd.description,
      inline: true
    });
  });
  
  embed.setFooter({ text: `Total: ${categoryCommands.length} commands | Click a command for details` });
  
  return embed;
}

function createCommandDetailEmbed(command) {
  const embed = new EmbedBuilder()
    .setColor(0x00CED1)
    .setTitle(`${command.emoji} /${command.name} Command`)
    .setDescription(command.description)
    .addFields(
      { name: '📝 Usage', value: `\`${command.usage}\``, inline: false },
      { name: '📁 Category', value: `${categories[command.category].emoji} ${command.category}`, inline: true },
      { name: '✨ Examples', value: command.examples.join('\n'), inline: false }
    );
  
  return embed;
}

// Component creation functions
function createInitialComponents() {
  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('search_command')
        .setLabel('🔍 Search Commands')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('categories_menu')
        .setLabel('📂 Browse Categories')
        .setStyle(ButtonStyle.Success)
    );
  
  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('view_all_commands')
        .setLabel('📋 View All Commands')
        .setStyle(ButtonStyle.Secondary)
    );
  
  return [row1, row2];
}

function createPaginationComponents() {
  const maxPage = Math.ceil(allCommands.length / COMMANDS_PER_PAGE) - 1;
  
  const row1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('prev_page')
        .setLabel('◀ Previous')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === 0),
      new ButtonBuilder()
        .setCustomId('main_menu')
        .setLabel('🏠 Main Menu')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('next_page')
        .setLabel('Next ▶')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currentPage === maxPage)
    );
  
  const row2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('search_command')
        .setLabel('🔍 Search')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('categories_menu')
        .setLabel('📂 Categories')
        .setStyle(ButtonStyle.Success)
    );
  
  return [row1, row2];
}

function createCategoriesComponents() {
  const rows = [];
  const categoriesArray = Object.keys(categories);
  
  for (let i = 0; i < categoriesArray.length; i += 5) {
    const row = new ActionRowBuilder();
    const chunk = categoriesArray.slice(i, i + 5);
    
    chunk.forEach(category => {
      const categoryInfo = categories[category];
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`category_${category}`)
          .setLabel(category)
          .setEmoji(categoryInfo.emoji)
          .setStyle(ButtonStyle.Primary)
      );
    });
    
    rows.push(row);
  }
  
  const navRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('main_menu')
        .setLabel('🏠 Main Menu')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('search_command')
        .setLabel('🔍 Search')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('view_all_commands')
        .setLabel('📋 All Commands')
        .setStyle(ButtonStyle.Secondary)
    );
  
  rows.push(navRow);
  return rows;
}

function createCategoryCommandsComponents(categoryName) {
  const categoryCommands = allCommands.filter(cmd => cmd.category === categoryName);
  const rows = [];
  
  for (let i = 0; i < categoryCommands.length; i += 5) {
    const row = new ActionRowBuilder();
    const chunk = categoryCommands.slice(i, i + 5);
    
    chunk.forEach(cmd => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(`select_command_${cmd.name}`)
          .setLabel(`/${cmd.name}`)
          .setEmoji(cmd.emoji)
          .setStyle(ButtonStyle.Secondary)
      );
    });
    
    rows.push(row);
  }
  
  const navRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('categories_menu')
        .setLabel('📂 Back to Categories')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('main_menu')
        .setLabel('🏠 Main Menu')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('search_command')
        .setLabel('🔍 Search')
        .setStyle(ButtonStyle.Primary)
    );
  
  rows.push(navRow);
  return rows;
}

function createCommandDetailComponents() {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('main_menu')
        .setLabel('🏠 Main Menu')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('search_command')
        .setLabel('🔍 Search Another')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('categories_menu')
        .setLabel('📂 Categories')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('view_all_commands')
        .setLabel('📋 All Commands')
        .setStyle(ButtonStyle.Secondary)
    );
  
  return [row];
}

module.exports = { 
  executeHelp,
  handleSelectMenu,
  handleModalSubmit,
  handleHelpButton  // Export the button handler
};
