const math = require('mathjs');

async function executeMath(interaction) {
  await interaction.deferReply();
  
  const expression = interaction.options.getString('expression');
  
  try {
    // Clean and evaluate the expression
    const cleanExpression = expression.replace(/[`´]/g, '');
    const result = math.evaluate(cleanExpression);
    
    // Format large numbers
    let formattedResult = result;
    if (typeof result === 'number' && (result > 1000000 || result < -1000000 || (Math.abs(result) < 0.001 && result !== 0))) {
      formattedResult = result.toExponential(4);
    }
    
    const response = `🧮 **Calculation Result**\n\n**Expression:** \`${cleanExpression}\`\n**Result:** \`${formattedResult}\`\n\n*Supported operations: + - * / ^ √ sin cos tan log exp pi e abs round floor ceil*`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error evaluating expression**\n\nI couldn't calculate: \`${expression}\`\n\n**Error:** ${error.message}\n\n💡 **Tips:**\n• Use * for multiplication\n• Use ^ for exponents\n• Use sqrt() for square roots\n• Use pi for π\n• Example: \`2*pi*sqrt(16)^2\``);
  }
}

module.exports = { executeMath };