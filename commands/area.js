const math = require('mathjs');

async function executeArea(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = 0;
    let formula = '';
    let calculation = '';
    
    switch (subcommand) {
      case 'circle':
        const radius = interaction.options.getNumber('radius');
        result = Math.PI * radius * radius;
        formula = 'π × r²';
        calculation = `π × ${radius}²`;
        break;
        
      case 'triangle':
        const base = interaction.options.getNumber('base');
        const height = interaction.options.getNumber('height');
        result = 0.5 * base * height;
        formula = '½ × base × height';
        calculation = `½ × ${base} × ${height}`;
        break;
        
      case 'triangle-heron':
        const a = interaction.options.getNumber('a');
        const b = interaction.options.getNumber('b');
        const c = interaction.options.getNumber('c');
        const s = (a + b + c) / 2; // semi-perimeter
        result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        formula = '√[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2';
        calculation = `√[${s}(${s}-${a})(${s}-${b})(${s}-${c})]`;
        break;
        
      case 'rectangle':
        const length = interaction.options.getNumber('length');
        const width = interaction.options.getNumber('width');
        result = length * width;
        formula = 'length × width';
        calculation = `${length} × ${width}`;
        break;
        
      case 'square':
        const side = interaction.options.getNumber('side');
        result = side * side;
        formula = 'side²';
        calculation = `${side}²`;
        break;
        
      case 'trapezoid':
        const sideA = interaction.options.getNumber('a');
        const sideB = interaction.options.getNumber('b');
        const trapHeight = interaction.options.getNumber('height');
        result = 0.5 * (sideA + sideB) * trapHeight;
        formula = '½ × (a + b) × height';
        calculation = `½ × (${sideA} + ${sideB}) × ${trapHeight}`;
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `📐 **Area Calculation**\n\n**Shape:** ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n**Result:** ${result.toFixed(4)} square units`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error calculating area**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/area circle radius:5\`\n• \`/area triangle base:10 height:8\`\n• \`/area triangle-heron a:3 b:4 c:5\``);
  }
}

module.exports = { executeArea };
