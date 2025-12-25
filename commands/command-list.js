const { SlashCommandBuilder } = require('discord.js');

const commands = [
  // Existing commands...
  new SlashCommandBuilder()
    .setName('math')
    .setDescription('Perform mathematical calculations')
    .addStringOption(option =>
      option.setName('expression')
        .setDescription('The mathematical expression to calculate')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('statistics')
    .setDescription('Calculate statistical measures')
    .addStringOption(option =>
      option.setName('numbers')
        .setDescription('Numbers separated by spaces')
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
        .setDescription('Source unit')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('to')
        .setDescription('Target unit')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('solve')
    .setDescription('Solve equations')
    .addStringOption(option =>
      option.setName('equation')
        .setDescription('Equation to solve')
        .setRequired(true)
    ),
  
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
  
  // NEW GEOMETRY COMMANDS
  
  new SlashCommandBuilder()
    .setName('area')
    .setDescription('Calculate area of geometric shapes')
    .addSubcommand(subcommand =>
      subcommand
        .setName('circle')
        .setDescription('Area of a circle')
        .addNumberOption(option =>
          option.setName('radius')
            .setDescription('Radius of the circle')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('triangle')
        .setDescription('Area of a triangle')
        .addNumberOption(option =>
          option.setName('base')
            .setDescription('Base length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('height')
            .setDescription('Height')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('triangle-heron')
        .setDescription('Area using Heron\'s formula')
        .addNumberOption(option =>
          option.setName('a')
            .setDescription('Side a length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('Side b length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('c')
            .setDescription('Side c length')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('rectangle')
        .setDescription('Area of a rectangle')
        .addNumberOption(option =>
          option.setName('length')
            .setDescription('Length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('width')
            .setDescription('Width')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('square')
        .setDescription('Area of a square')
        .addNumberOption(option =>
          option.setName('side')
            .setDescription('Side length')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('trapezoid')
        .setDescription('Area of a trapezoid')
        .addNumberOption(option =>
          option.setName('a')
            .setDescription('Parallel side a')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('Parallel side b')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('height')
            .setDescription('Height between parallel sides')
            .setRequired(true)
        )
    ),
  
  new SlashCommandBuilder()
    .setName('perimeter')
    .setDescription('Calculate perimeter of geometric shapes')
    .addSubcommand(subcommand =>
      subcommand
        .setName('circle')
        .setDescription('Circumference of a circle')
        .addNumberOption(option =>
          option.setName('radius')
            .setDescription('Radius of the circle')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('triangle')
        .setDescription('Perimeter of a triangle')
        .addNumberOption(option =>
          option.setName('a')
            .setDescription('Side a length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('Side b length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('c')
            .setDescription('Side c length')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('rectangle')
        .setDescription('Perimeter of a rectangle')
        .addNumberOption(option =>
          option.setName('length')
            .setDescription('Length')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('width')
            .setDescription('Width')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('square')
        .setDescription('Perimeter of a square')
        .addNumberOption(option =>
          option.setName('side')
            .setDescription('Side length')
            .setRequired(true)
        )
    ),
  
  new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Calculate volume of 3D shapes')
    .addSubcommand(subcommand =>
      subcommand
        .setName('cube')
        .setDescription('Volume of a cube')
        .addNumberOption(option =>
          option.setName('side')
            .setDescription('Side length')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('sphere')
        .setDescription('Volume of a sphere')
        .addNumberOption(option =>
          option.setName('radius')
            .setDescription('Radius')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('cylinder')
        .setDescription('Volume of a cylinder')
        .addNumberOption(option =>
          option.setName('radius')
            .setDescription('Radius of base')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('height')
            .setDescription('Height')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('cone')
        .setDescription('Volume of a cone')
        .addNumberOption(option =>
          option.setName('radius')
            .setDescription('Radius of base')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('height')
            .setDescription('Height')
            .setRequired(true)
        )
    ),
  
  new SlashCommandBuilder()
    .setName('trigonometry')
    .setDescription('Trigonometric calculations')
    .addSubcommand(subcommand =>
      subcommand
        .setName('sin')
        .setDescription('Calculate sine')
        .addNumberOption(option =>
          option.setName('angle')
            .setDescription('Angle in degrees')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('cos')
        .setDescription('Calculate cosine')
        .addNumberOption(option =>
          option.setName('angle')
            .setDescription('Angle in degrees')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('tan')
        .setDescription('Calculate tangent')
        .addNumberOption(option =>
          option.setName('angle')
            .setDescription('Angle in degrees')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('pythagoras')
        .setDescription('Pythagorean theorem')
        .addStringOption(option =>
          option.setName('find')
            .setDescription('What to find')
            .setRequired(true)
            .addChoices(
              { name: 'Hypotenuse (c)', value: 'hypotenuse' },
              { name: 'Side a', value: 'side_a' },
              { name: 'Side b', value: 'side_b' }
            )
        )
        .addNumberOption(option =>
          option.setName('a')
            .setDescription('Side a length')
            .setRequired(false)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('Side b length')
            .setRequired(false)
        )
        .addNumberOption(option =>
          option.setName('c')
            .setDescription('Hypotenuse length')
            .setRequired(false)
        )
    ),
  
  new SlashCommandBuilder()
    .setName('algebra')
    .setDescription('Algebraic operations')
    .addSubcommand(subcommand =>
      subcommand
        .setName('quadratic')
        .setDescription('Solve quadratic equation')
        .addNumberOption(option =>
          option.setName('a')
            .setDescription('Coefficient a')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('b')
            .setDescription('Coefficient b')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('c')
            .setDescription('Coefficient c')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('distance')
        .setDescription('Distance between two points')
        .addNumberOption(option =>
          option.setName('x1')
            .setDescription('x-coordinate of point 1')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('y1')
            .setDescription('y-coordinate of point 1')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('x2')
            .setDescription('x-coordinate of point 2')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('y2')
            .setDescription('y-coordinate of point 2')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('slope')
        .setDescription('Slope of a line')
        .addNumberOption(option =>
          option.setName('x1')
            .setDescription('x-coordinate of point 1')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('y1')
            .setDescription('y-coordinate of point 1')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('x2')
            .setDescription('x-coordinate of point 2')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('y2')
            .setDescription('y-coordinate of point 2')
            .setRequired(true)
        )
    )
].map(command => command.toJSON());

module.exports = { commands };
