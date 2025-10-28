const math = require('mathjs');

async function executeSolve(interaction) {
  await interaction.deferReply();
  
  const equation = interaction.options.getString('equation');
  
  try {
    let solutionText = '';
    let steps = [];
    
    // Clean the equation
    const cleanEquation = equation.replace(/\s/g, '');
    
    // Replace common math symbols
    let processedEquation = cleanEquation
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt');
    
    // Try advanced equation solving for complex equations
    const result = await solveAdvancedEquation(processedEquation, steps);
    
    if (result.solved) {
      solutionText = result.solution;
      await sendSplitMessages(interaction, equation, solutionText, steps);
    } else {
      // Fallback to numerical solving
      const numericalResult = await solveNumerically(processedEquation, steps);
      if (numericalResult.found) {
        solutionText = numericalResult.solution;
        await sendSplitMessages(interaction, equation, solutionText, steps);
      } else {
        solutionText = 'Could not find an exact solution. The equation may be too complex.';
        steps.push('Equation may be too complex for automatic solving');
        await sendSplitMessages(interaction, equation, solutionText, steps);
      }
    }
    
  } catch (error) {
    await interaction.editReply(`❌ **Error solving equation**\n\nI couldn't solve: ${equation}\n\n**Error:** ${error.message}\n\n💡 **Working Examples:**\n• \`/solve equation:2*x + 5 = 13\`\n• \`/solve equation:x + 3 = 7\`\n• \`/solve equation:x^2 - 4 = 0\`\n• \`/solve equation:3*x - 6 = 0\``);
  }
}

// Advanced equation solver for complex equations
async function solveAdvancedEquation(equation, steps) {
  try {
    steps.push(`Original equation: ${equation}`);
    
    // Handle equations with fractions by finding common denominator
    if (equation.includes('/') && equation.includes('=')) {
      const [left, right] = equation.split('=');
      
      // Extract all denominators
      const leftDenominators = extractDenominators(left);
      const rightDenominators = extractDenominators(right);
      const allDenominators = [...leftDenominators, ...rightDenominators];
      
      if (allDenominators.length > 0) {
        steps.push(`Found denominators: ${allDenominators.join(', ')}`);
        
        // Multiply both sides by LCM of denominators to eliminate fractions
        const lcm = findLCM(allDenominators);
        steps.push(`Multiply both sides by LCM: ${lcm}`);
        
        const leftMultiplied = multiplyByLCM(left, lcm);
        const rightMultiplied = multiplyByLCM(right, lcm);
        
        steps.push(`Left side: ${left} × ${lcm} = ${leftMultiplied}`);
        steps.push(`Right side: ${right} × ${lcm} = ${rightMultiplied}`);
        
        const simplifiedEquation = `${leftMultiplied} = ${rightMultiplied}`;
        steps.push(`Simplified: ${simplifiedEquation}`);
        
        // Now solve the simplified equation
        return await solveLinearEquation(simplifiedEquation, steps);
      }
    }
    
    // Try direct linear equation solving
    return await solveLinearEquation(equation, steps);
    
  } catch (error) {
    return { solved: false, solution: '' };
  }
}

// Extract denominators from expression
function extractDenominators(expression) {
  const denominators = [];
  const fractionRegex = /\([^)]+\)\/\d+|\w\/\d+/g;
  let match;
  
  while ((match = fractionRegex.exec(expression)) !== null) {
    const fraction = match[0];
    const denominator = fraction.split('/')[1];
    if (denominator && !isNaN(denominator)) {
      denominators.push(parseInt(denominator));
    }
  }
  
  return denominators;
}

// Find LCM of numbers
function findLCM(numbers) {
  if (numbers.length === 0) return 1;
  
  let lcm = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    lcm = (lcm * numbers[i]) / gcd(lcm, numbers[i]);
  }
  return lcm;
}

// Find GCD of two numbers
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Multiply expression by LCM to eliminate fractions
function multiplyByLCM(expression, lcm) {
  // This is a simplified version - in a real implementation, you'd use a proper parser
  let result = '';
  const terms = expression.split(/(?=[+-])/);
  
  for (let term of terms) {
    term = term.trim();
    if (term.includes('/')) {
      const [numerator, denominator] = term.split('/');
      const multiplied = `(${numerator}*${lcm}/${denominator})`;
      result += multiplied;
    } else {
      result += `(${term}*${lcm})`;
    }
  }
  
  return result;
}

// Solve linear equations
async function solveLinearEquation(equation, steps) {
  try {
    const [left, right] = equation.split('=');
    
    // Move all terms to left side: left - right = 0
    const simplified = `(${left}) - (${right})`;
    steps.push(`Rearrange: ${left} - (${right}) = 0`);
    
    // Try to solve numerically for x
    for (let x = -100; x <= 100; x++) {
      try {
        const testValue = math.evaluate(simplified, { x });
        if (Math.abs(testValue) < 0.001) {
          steps.push(`Test x = ${x}: ${simplified} = ${testValue} ≈ 0`);
          steps.push(`✓ Solution found: x = ${x}`);
          return { solved: true, solution: `x = ${x}` };
        }
      } catch (e) {
        // Continue testing other values
      }
    }
    
    return { solved: false, solution: '' };
  } catch (error) {
    return { solved: false, solution: '' };
  }
}

// Numerical equation solver
async function solveNumerically(equation, steps) {
  try {
    steps.push('Attempting numerical solution...');
    
    const [left, right] = equation.split('=');
    
    // Test a range of values
    for (let x = -50; x <= 50; x += 0.5) {
      try {
        const leftValue = math.evaluate(left, { x });
        const rightValue = math.evaluate(right, { x });
        const difference = Math.abs(leftValue - rightValue);
        
        if (difference < 0.01) {
          steps.push(`Numerical solution found: x ≈ ${x}`);
          steps.push(`Verification: ${left} = ${leftValue.toFixed(4)}, ${right} = ${rightValue.toFixed(4)}`);
          return { found: true, solution: `x ≈ ${x}` };
        }
      } catch (e) {
        // Continue testing other values
      }
    }
    
    return { found: false, solution: '' };
  } catch (error) {
    return { found: false, solution: '' };
  }
}

// Function to split long messages (keep the same as before)
async function sendSplitMessages(interaction, equation, solutionText, steps) {
  const MAX_MESSAGE_LENGTH = 2000;
  const CODE_BLOCK_OVERHEAD = 10;
  
  const mainMessage = `🔍 **Equation Solution**\n\n**Equation:** ${equation}\n\n**Solution:** ${solutionText}\n\n**Step-by-step solution:**`;
  const stepsCodeBlock = `\`\`\`\n${steps.join('\n')}\n\`\`\``;
  const tipMessage = `\n\n💡 **Tip:** For complex equations, try breaking them into smaller parts`;
  
  const totalLength = mainMessage.length + stepsCodeBlock.length + tipMessage.length;
  
  if (totalLength <= MAX_MESSAGE_LENGTH) {
    await interaction.editReply(mainMessage + '\n' + stepsCodeBlock + tipMessage);
  } else {
    await interaction.editReply(mainMessage);
    
    const stepsText = steps.join('\n');
    const availableLength = MAX_MESSAGE_LENGTH - CODE_BLOCK_OVERHEAD;
    
    if (stepsText.length <= availableLength) {
      await interaction.followUp(stepsCodeBlock + tipMessage);
    } else {
      let currentChunk = '';
      const stepChunks = [];
      
      for (const step of steps) {
        if (currentChunk.length + step.length + 1 > availableLength) {
          if (currentChunk) stepChunks.push(currentChunk);
          currentChunk = step;
        } else {
          currentChunk = currentChunk ? currentChunk + '\n' + step : step;
        }
      }
      
      if (currentChunk) stepChunks.push(currentChunk);
      
      for (let i = 0; i < stepChunks.length; i++) {
        const chunkMessage = `\`\`\`\n${stepChunks[i]}\n\`\`\`${i === stepChunks.length - 1 ? tipMessage : ''}`;
        if (i === 0) {
          await interaction.followUp(chunkMessage);
        } else {
          await interaction.followUp(`\`\`\`\n${stepChunks[i]}\n\`\`\``);
        }
      }
    }
  }
}

module.exports = { executeSolve };