async function executeVolume(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = 0;
    let formula = '';
    let calculation = '';
    
    switch (subcommand) {
      case 'cube':
        const side = interaction.options.getNumber('side');
        result = side * side * side;
        formula = 'side³';
        calculation = `${side}³`;
        break;
        
      case 'sphere':
        const radius = interaction.options.getNumber('radius');
        result = (4/3) * Math.PI * radius * radius * radius;
        formula = '⁴⁄₃ × π × r³';
        calculation = `⁴⁄₃ × π × ${radius}³`;
        break;
        
      case 'cylinder':
        const cylRadius = interaction.options.getNumber('radius');
        const height = interaction.options.getNumber('height');
        result = Math.PI * cylRadius * cylRadius * height;
        formula = 'π × r² × h';
        calculation = `π × ${cylRadius}² × ${height}`;
        break;
        
      case 'cone':
        const coneRadius = interaction.options.getNumber('radius');
        const coneHeight = interaction.options.getNumber('height');
        result = (1/3) * Math.PI * coneRadius * coneRadius * coneHeight;
        formula = '⅓ × π × r² × h';
        calculation = `⅓ × π × ${coneRadius}² × ${coneHeight}`;
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `🧊 **Volume Calculation**\n\n**Shape:** ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n**Result:** ${result.toFixed(4)} cubic units`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error calculating volume**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/volume cube side:5\`\n• \`/volume sphere radius:3\`\n• \`/volume cylinder radius:2 height:10\``);
  }
}

module.exports = { executeVolume };
