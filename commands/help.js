async function executeHelp(interaction) {
  await interaction.deferReply();
  
  const response = `🤖 **Math Bot - Complete Help Guide**\n\n**Available Commands:**\n\n🧮 **/math expression:<expression>**\nBasic mathematical calculations\n\n📊 **/statistics numbers:<number list>**\nStatistical analysis\n\n🔄 **/convert value:<number> from:<unit> to:<unit>**\nUnit conversion\n\n🔍 **/solve equation:<equation>**\nEquation solving\n\n📐 **/area [shape]**\nArea calculations:\n• circle, triangle, triangle-heron\n• rectangle, square, trapezoid\n\n📏 **/perimeter [shape]**\nPerimeter calculations:\n• circle, triangle, rectangle, square\n\n🧊 **/volume [shape]**\nVolume calculations:\n• cube, sphere, cylinder, cone\n\n📐 **/trigonometry [operation]**\nTrigonometric functions:\n• sin, cos, tan, pythagoras\n\n➗ **/algebra [operation]**\nAlgebraic operations:\n• quadratic, distance, slope\n\n**Examples:**\n• \`/area circle radius:5\`\n• \`/perimeter triangle a:3 b:4 c:5\`\n• \`/volume sphere radius:3\`\n• \`/trigonometry sin angle:30\`\n• \`/algebra quadratic a:1 b:-3 c:2\``;
  
  await interaction.editReply(response);
}

module.exports = { executeHelp };
