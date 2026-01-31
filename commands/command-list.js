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
    ),

  new SlashCommandBuilder()
    .setName('complex')
    .setDescription('Perform operations with complex numbers')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add two complex numbers')
        .addNumberOption(option =>
          option.setName('real1')
            .setDescription('Real part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag1')
            .setDescription('Imaginary part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('real2')
            .setDescription('Real part of second number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag2')
            .setDescription('Imaginary part of second number')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('subtract')
        .setDescription('Subtract two complex numbers')
        .addNumberOption(option =>
          option.setName('real1')
            .setDescription('Real part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag1')
            .setDescription('Imaginary part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('real2')
            .setDescription('Real part of second number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag2')
            .setDescription('Imaginary part of second number')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('multiply')
        .setDescription('Multiply two complex numbers')
        .addNumberOption(option =>
          option.setName('real1')
            .setDescription('Real part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag1')
            .setDescription('Imaginary part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('real2')
            .setDescription('Real part of second number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag2')
            .setDescription('Imaginary part of second number')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('divide')
        .setDescription('Divide two complex numbers')
        .addNumberOption(option =>
          option.setName('real1')
            .setDescription('Real part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag1')
            .setDescription('Imaginary part of first number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('real2')
            .setDescription('Real part of second number')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag2')
            .setDescription('Imaginary part of second number')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('conjugate')
        .setDescription('Find conjugate of a complex number')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('magnitude')
        .setDescription('Find magnitude/absolute value of complex number')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('argument')
        .setDescription('Find argument/phase of complex number (in radians)')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('polar')
        .setDescription('Convert complex number to polar form')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('rectangular')
        .setDescription('Convert polar form to rectangular form')
        .addNumberOption(option =>
          option.setName('magnitude')
            .setDescription('Magnitude (r)')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('angle')
            .setDescription('Angle in radians (θ)')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('power')
        .setDescription('Raise complex number to a power')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('power')
            .setDescription('Power to raise to')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('roots')
        .setDescription('Find nth roots of a complex number')
        .addNumberOption(option =>
          option.setName('real')
            .setDescription('Real part')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('imag')
            .setDescription('Imaginary part')
            .setRequired(true)
        )
        .addIntegerOption(option =>
          option.setName('n')
            .setDescription('Number of roots to find (n)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(10)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('evaluate')
        .setDescription('Evaluate complex number expression')
        .addStringOption(option =>
          option.setName('expression')
            .setDescription('Expression with complex numbers (use i for imaginary)')
            .setRequired(true)
        )
    ),
    // Add this to your existing command-list.js file
new SlashCommandBuilder()
  .setName('binomial')
  .setDescription('Perform binomial expansion and calculations')
  .addSubcommand(subcommand =>
    subcommand
      .setName('expand')
      .setDescription('Expand binomial expression (a + b)^n')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^5, (2x-3)^4, (x+y)^3)')
          .setRequired(true)
      )
      .addBooleanOption(option =>
        option.setName('show_steps')
          .setDescription('Show step-by-step expansion')
          .setRequired(false)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('coefficient')
      .setDescription('Find specific coefficient in binomial expansion')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^5, (2x-3)^4)')
          .setRequired(true)
      )
      .addIntegerOption(option =>
        option.setName('term')
          .setDescription('Term number (starting from 0) or power of variable')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('general_term')
      .setDescription('Find general term formula for binomial expansion')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^n, (ax+by)^n)')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('middle_term')
      .setDescription('Find middle term(s) of binomial expansion')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^n, (a+b)^n)')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('sum_coefficients')
      .setDescription('Find sum of coefficients in binomial expansion')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^n, (2x-3)^n)')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('greatest_coefficient')
      .setDescription('Find greatest coefficient in binomial expansion')
      .addStringOption(option =>
        option.setName('expression')
          .setDescription('Binomial expression (e.g., (x+2)^n, (3x+5)^n)')
          .setRequired(true)
      )
  )
].map(command => command.toJSON());

module.exports = { commands };
