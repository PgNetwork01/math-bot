async function executeAlgebra(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = '';
    let formula = '';
    let calculation = '';
    
    switch (subcommand) {
      case 'quadratic':
        const a = interaction.options.getNumber('a');
        const b = interaction.options.getNumber('b');
        const c = interaction.options.getNumber('c');
        
        const discriminant = b*b - 4*a*c;
        
        formula = 'x = [-b ± √(b² - 4ac)] / 2a';
        calculation = `D = ${b}² - 4×${a}×${c} = ${discriminant}`;
        
        if (discriminant > 0) {
          const x1 = (-b + Math.sqrt(discriminant)) / (2*a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2*a);
          result = `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
        } else if (discriminant === 0) {
          const x = -b / (2*a);
          result = `x = ${x.toFixed(4)} (repeated root)`;
        } else {
          const real = -b / (2*a);
          const imag = Math.sqrt(-discriminant) / (2*a);
          result = `x₁ = ${real.toFixed(4)} + ${imag.toFixed(4)}i, x₂ = ${real.toFixed(4)} - ${imag.toFixed(4)}i`;
        }
        break;
        
      case 'distance':
        const x1 = interaction.options.getNumber('x1');
        const y1 = interaction.options.getNumber('y1');
        const x2 = interaction.options.getNumber('x2');
        const y2 = interaction.options.getNumber('y2');
        
        result = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
        formula = '√[(x₂ - x₁)² + (y₂ - y₁)²]';
        calculation = `√[(${x2} - ${x1})² + (${y2} - ${y1})²]`;
        break;
        
      case 'slope':
        const sx1 = interaction.options.getNumber('x1');
        const sy1 = interaction.options.getNumber('y1');
        const sx2 = interaction.options.getNumber('x2');
        const sy2 = interaction.options.getNumber('y2');
        
        if (sx2 - sx1 === 0) {
          result = 'Undefined (vertical line)';
        } else {
          result = (sy2 - sy1) / (sx2 - sx1);
        }
        formula = 'm = (y₂ - y₁) / (x₂ - x₁)';
        calculation = `(${sy2} - ${sy1}) / (${sx2} - ${sx1})`;
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `➗ **Algebra Calculation**\n\n**Operation:** ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n**Result:** ${result}`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error in algebra calculation**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/algebra quadratic a:1 b:-3 c:2\`\n• \`/algebra distance x1:0 y1:0 x2:3 y2:4\`\n• \`/algebra slope x1:1 y1:2 x2:3 y2:4\``);
  }
}

module.exports = { executeAlgebra };
