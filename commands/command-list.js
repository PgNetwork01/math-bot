const { SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('math')
    .setDescription('Perform mathematical calculations')
    .addStringOption(option =>
      option.setName('expression')
        .setDescription('The mathematical expression to calculate (e.g., 2+2*5, sin(45), sqrt(16))')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('statistics')
    .setDescription('Calculate statistical measures for a set of numbers')
    .addStringOption(option =>
      option.setName('numbers')
        .setDescription('Numbers separated by spaces (e.g., 1 2 3 4 5)')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert between different units')
    .addNumberOption(option =>
      option.setName('value')
        .setDescription('The value to convert')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('from')
        .setDescription('Source unit (e.g., cm, kg, mile)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('to')
        .setDescription('Target unit (e.g., m, lb, km)')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('solve')
    .setDescription('Solve equations')
    .addStringOption(option =>
      option.setName('equation')
        .setDescription('Equation to solve (e.g., x^2 - 4 = 0, 2x + 5 = 13)')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands and examples')
].map(command => command.toJSON());

module.exports = { commands };