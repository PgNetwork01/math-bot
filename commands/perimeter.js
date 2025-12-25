async function executePerimeter(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = 0;
    let formula = '';
    let calculation = '';
    
    switch (subcommand) {
      case 'circle':
        const radius = interaction.options.getNumber('radius');
        result = 2 * Math.PI * radius;
        formula = '2 × π × r';
        calculation = `2 × π × ${radius}`;
        break;
        
      case 'triangle':
        const a = interaction.options.getNumber('a');
        const b = interaction.options.getNumber('b');
        const c = interaction.options.getNumber('c');
        result = a + b + c;
        formula = 'a + b + c';
        calculation = `${a} + ${b} + ${c}`;
        break;
        
      case 'rectangle':
        const length = interaction.options.getNumber('length');
        const width = interaction.options.getNumber('width');
        result = 2 * (length + width);
        formula = '2 × (length + width)';
        calculation = `2 × (${length} + ${width})`;
        break;
        
      case 'square':
        const side = interaction.options.getNumber('side');
        result = 4 * side;
        formula = '4 × side';
        calculation = `4 × ${side}`;
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `📏 **Perimeter Calculation**\n\n**Shape:** ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n**Result:** ${result.toFixed(4)} units`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error calculating perimeter**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/perimeter circle radius:5\`\n• \`/perimeter triangle a:3 b:4 c:5\`\n• \`/perimeter rectangle length:10 width:8\``);
  }
}

module.exports = { executePerimeter };
