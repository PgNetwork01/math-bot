async function executeHelp(interaction) {
  await interaction.deferReply();
  
  const response = `🤖 **Math Bot - Complete Help Guide**\n\n**Available Commands:**\n\n🧮 **/math expression:<expression>**\nPerform mathematical calculations\n*Examples:*\n• \`/math expression:2+2*5\`\n• \`/math expression:sin(45)*sqrt(16)\`\n• \`/math expression:2*pi*5^2\`\n• \`/math expression:log(100,10)\`\n\n📊 **/statistics numbers:<number list>**\nCalculate statistical measures\n*Examples:*\n• \`/statistics numbers:1 2 3 4 5\`\n• \`/statistics numbers:10,20,30,40,50\`\n\n🔄 **/convert value:<number> from:<unit> to:<unit>**\nConvert between units\n*Examples:*\n• \`/convert value:100 from:cm to:m\`\n• \`/convert value:32 from:fahrenheit to:celsius\`\n• \`/convert value:1 from:km to:mile\`\n\n🔍 **/solve equation:<equation>**\nSolve equations\n*Examples:*\n• \`/solve equation:2x + 5 = 13\`\n• \`/solve equation:x^2 - 4 = 0\`\n• \`/solve equation:x+y=10, x-y=2\`\n\n**Supported Operations:**\n• Basic: + - * / ^ ( )\n• Functions: sin, cos, tan, sqrt, log, exp, abs\n• Constants: pi, e\n• Advanced: matrices, complex numbers, calculus\n\n**Need more help?** Try the examples above or experiment with different mathematical expressions!`;
  
  await interaction.editReply(response);
}

module.exports = { executeHelp };