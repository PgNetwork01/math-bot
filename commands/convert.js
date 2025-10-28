const math = require('mathjs');

async function executeConvert(interaction) {
  await interaction.deferReply();
  
  const value = interaction.options.getNumber('value');
  const fromUnit = interaction.options.getString('from');
  const toUnit = interaction.options.getString('to');
  
  try {
    const result = math.unit(value, fromUnit).to(toUnit);
    
    const response = `🔄 **Unit Conversion**\n\n**Input:** ${value} ${fromUnit}\n**Output:** ${result.toString()}\n\n📋 **Common unit categories:**\n• **Length:** mm, cm, m, km, inch, ft, yd, mile\n• **Weight:** mg, g, kg, oz, lb, ton\n• **Volume:** ml, l, cup, pint, gallon\n• **Temperature:** celsius, fahrenheit, kelvin\n• **Area:** m2, km2, hectare, acre, ft2\n• **Speed:** m/s, km/h, mph, knot\n\n💡 **Example:** \`/convert value:100 from:cm to:m\``;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Conversion Error**\n\nCould not convert ${value} ${fromUnit} to ${toUnit}\n\n**Error:** ${error.message}\n\n💡 **Tips:**\n• Make sure units are compatible\n• Use standard unit abbreviations\n• Example: \`/convert value:100 from:cm to:m\``);
  }
}

module.exports = { executeConvert };