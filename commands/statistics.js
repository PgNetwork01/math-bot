const math = require('mathjs');

async function executeStats(interaction) {
  await interaction.deferReply();
  
  const numbersString = interaction.options.getString('numbers');
  
  try {
    // Parse numbers from string
    const numbers = numbersString.split(/[\s,]+/).map(num => parseFloat(num)).filter(num => !isNaN(num));
    
    if (numbers.length === 0) {
      return await interaction.editReply('❌ **Invalid Input**\n\nPlease provide valid numbers separated by spaces or commas.\nExample: `/statistics numbers:1 2 3 4 5`');
    }
    
    if (numbers.length === 1) {
      return await interaction.editReply('❌ **Insufficient Data**\n\nPlease provide at least 2 numbers for statistical analysis.\nExample: `/statistics numbers:1 2 3 4 5`');
    }
    
    // Calculate all statistics
    const sum = math.sum(numbers);
    const mean = math.mean(numbers);
    const median = math.median(numbers);
    const mode = math.mode(numbers);
    const std = math.std(numbers);
    const variance = math.variance(numbers);
    const min = math.min(numbers);
    const max = math.max(numbers);
    const range = max - min;
    
    // Calculate quartiles
    const sorted = numbers.slice().sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    
    const response = `📊 **Statistical Analysis**\n\n**Dataset:** [${numbers.join(', ')}]\n**Count:** ${numbers.length} numbers\n\n**Measures of Central Tendency:**\n• **Sum:** ${sum}\n• **Mean (Average):** ${mean.toFixed(4)}\n• **Median:** ${median}\n• **Mode:** ${mode}\n\n**Measures of Dispersion:**\n• **Standard Deviation:** ${std.toFixed(4)}\n• **Variance:** ${variance.toFixed(4)}\n• **Range:** ${range} (${min} to ${max})\n• **Q1 (25th %ile):** ${q1}\n• **Q3 (75th %ile):** ${q3}\n• **IQR:** ${iqr}\n\n**Data Range:** Minimum = ${min}, Maximum = ${max}`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error calculating statistics**\n\n**Error:** ${error.message}\n\n💡 **Example usage:** \`/statistics numbers:1 2 3 4 5\``);
  }
}

module.exports = { executeStats };