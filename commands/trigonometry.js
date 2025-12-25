async function executeTrigonometry(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = 0;
    let formula = '';
    let calculation = '';
    
    switch (subcommand) {
      case 'sin':
        const sinAngle = interaction.options.getNumber('angle');
        result = Math.sin(sinAngle * Math.PI / 180);
        formula = 'sin(θ)';
        calculation = `sin(${sinAngle}°)`;
        break;
        
      case 'cos':
        const cosAngle = interaction.options.getNumber('angle');
        result = Math.cos(cosAngle * Math.PI / 180);
        formula = 'cos(θ)';
        calculation = `cos(${cosAngle}°)`;
        break;
        
      case 'tan':
        const tanAngle = interaction.options.getNumber('angle');
        result = Math.tan(tanAngle * Math.PI / 180);
        formula = 'tan(θ)';
        calculation = `tan(${tanAngle}°)`;
        break;
        
      case 'pythagoras':
        const find = interaction.options.getString('find');
        const a = interaction.options.getNumber('a');
        const b = interaction.options.getNumber('b');
        const c = interaction.options.getNumber('c');
        
        switch (find) {
          case 'hypotenuse':
            if (a && b) {
              result = Math.sqrt(a*a + b*b);
              formula = 'c = √(a² + b²)';
              calculation = `√(${a}² + ${b}²)`;
            } else {
              throw new Error('Need both a and b to find hypotenuse');
            }
            break;
            
          case 'side_a':
            if (b && c) {
              result = Math.sqrt(c*c - b*b);
              formula = 'a = √(c² - b²)';
              calculation = `√(${c}² - ${b}²)`;
            } else {
              throw new Error('Need both b and c to find side a');
            }
            break;
            
          case 'side_b':
            if (a && c) {
              result = Math.sqrt(c*c - a*a);
              formula = 'b = √(c² - a²)';
              calculation = `√(${c}² - ${a}²)`;
            } else {
              throw new Error('Need both a and c to find side b');
            }
            break;
        }
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `📐 **Trigonometry Calculation**\n\n**Operation:** ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n**Result:** ${result.toFixed(4)}`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error in trigonometry calculation**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/trigonometry sin angle:30\`\n• \`/trigonometry cos angle:45\`\n• \`/trigonometry pythagoras find:hypotenuse a:3 b:4\``);
  }
}

module.exports = { executeTrigonometry };
