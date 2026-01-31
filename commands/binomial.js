const math = require('mathjs');

async function executeBinomial(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  const expression = interaction.options.getString('expression');
  
  try {
    let result = '';
    let steps = [];
    
    // Parse the binomial expression
    const parsed = parseBinomialExpression(expression);
    if (!parsed) {
      throw new Error('Invalid binomial expression format. Use (ax + b)^n or similar');
    }
    
    const { a, b, variable, n } = parsed;
    steps.push(`Parsed expression: (${a}${variable} ${b >= 0 ? '+' : '-'} ${Math.abs(b)})^${n}`);
    
    switch (subcommand) {
      case 'expand':
        const showSteps = interaction.options.getBoolean('show_steps') || false;
        result = expandBinomial(a, b, variable, n, steps, showSteps);
        break;
        
      case 'coefficient':
        const termNum = interaction.options.getInteger('term');
        result = findSpecificCoefficient(a, b, variable, n, termNum, steps);
        break;
        
      case 'general_term':
        result = findGeneralTerm(a, b, variable, n, steps);
        break;
        
      case 'middle_term':
        result = findMiddleTerms(a, b, variable, n, steps);
        break;
        
      case 'sum_coefficients':
        result = findSumOfCoefficients(a, b, n, steps);
        break;
        
      case 'greatest_coefficient':
        result = findGreatestCoefficient(a, b, n, steps);
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    // Format the response
    let response = `🔢 **Binomial Expansion - ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}**\n\n`;
    response += `**Expression:** ${expression}\n`;
    response += `**Parsed:** (${formatCoefficient(a)}${variable} ${b >= 0 ? '+' : '-'} ${Math.abs(b)})^${n}\n\n`;
    
    if (steps.length > 0) {
      response += `**Steps:**\n${steps.join('\n')}\n\n`;
    }
    
    response += `**Result:**\n${result}`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error in binomial operation**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/binomial expand expression:"(x+2)^5"\`\n• \`/binomial coefficient expression:"(2x-3)^4" term:2\`\n• \`/binomial middle_term expression:"(x+y)^6"\`\n• \`/binomial sum_coefficients expression:"(2x-1)^5"\``);
  }
}

// Helper functions
function parseBinomialExpression(expression) {
  // Remove spaces
  expression = expression.replace(/\s/g, '');
  
  // Match patterns like (ax + b)^n, (a + bx)^n, (x + y)^n, etc.
  const pattern = /^\(([+-]?\d*\.?\d*)([a-zA-Z]?)\s*([+-])\s*(\d*\.?\d*)([a-zA-Z]?)\)\^(\d+)$/;
  const match = expression.match(pattern);
  
  if (!match) {
    // Try another pattern: (ax + by)^n
    const pattern2 = /^\(([+-]?\d*\.?\d*)([a-zA-Z]?)\s*([+-])\s*(\d*\.?\d*)([a-zA-Z]?)\)\^(\d+)$/;
    const match2 = expression.match(pattern2);
    if (!match2) return null;
    
    const [, a, var1, sign, b, var2, n] = match2;
    
    // Determine which variable is used
    const variable = var1 || var2 || 'x';
    const aNum = a === '' || a === '+' ? 1 : a === '-' ? -1 : parseFloat(a);
    const bNum = (sign === '+' ? 1 : -1) * (b === '' ? 1 : parseFloat(b));
    
    return { a: aNum, b: bNum, variable, n: parseInt(n) };
  }
  
  const [, a, var1, sign, b, var2, n] = match;
  
  // Determine which variable is used
  const variable = var1 || var2 || 'x';
  const aNum = a === '' || a === '+' ? 1 : a === '-' ? -1 : parseFloat(a);
  const bNum = (sign === '+' ? 1 : -1) * (b === '' ? 1 : parseFloat(b));
  
  return { a: aNum, b: bNum, variable, n: parseInt(n) };
}

function formatCoefficient(coeff) {
  if (coeff === 1) return '';
  if (coeff === -1) return '-';
  return coeff.toString();
}

function binomialCoefficient(n, k) {
  // Calculate nCk = n! / (k! * (n-k)!)
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  // Use iterative calculation for efficiency
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = result * (n - k + i) / i;
  }
  
  return Math.round(result); // Should be integer
}

function expandBinomial(a, b, variable, n, steps, showSteps) {
  const terms = [];
  
  steps.push(`Using binomial theorem: (a + b)^n = Σ(k=0 to n) [nCk * a^(n-k) * b^k]`);
  steps.push(`Where a = ${a}${variable}, b = ${b}, n = ${n}`);
  
  if (showSteps) {
    steps.push(`\n**Calculating each term:**`);
  }
  
  for (let k = 0; k <= n; k++) {
    const nCk = binomialCoefficient(n, k);
    const powerA = n - k;
    const powerB = k;
    
    let termCoeff = nCk * Math.pow(a, powerA) * Math.pow(b, powerB);
    termCoeff = Math.round(termCoeff * 10000) / 10000; // Round to 4 decimal places
    
    let term = '';
    
    if (termCoeff === 0) continue;
    
    if (powerA > 0) {
      const coeffStr = formatCoefficient(Math.abs(termCoeff));
      term = `${coeffStr}${variable}`;
      if (powerA > 1) term += `^${powerA}`;
    } else {
      term = Math.abs(termCoeff).toString();
    }
    
    if (showSteps) {
      const step = `Term ${k+1} (k=${k}): nC${k} = ${nCk}, (${a}${variable})^${powerA} = ${Math.pow(a, powerA)}${powerA > 0 ? variable + (powerA > 1 ? `^${powerA}` : '') : ''}, (${b})^${k} = ${Math.pow(b, k)}`;
      steps.push(step);
      steps.push(`  → ${nCk} × ${Math.pow(a, powerA)}${powerA > 0 ? variable + (powerA > 1 ? `^${powerA}` : '') : ''} × ${Math.pow(b, k)} = ${termCoeff > 0 ? '+' : '-'} ${term}`);
    }
    
    // Add sign
    const sign = termCoeff >= 0 ? '+' : '-';
    terms.push({ sign, term, coeff: termCoeff, k });
  }
  
  // Build expansion string
  let expansion = '';
  for (let i = 0; i < terms.length; i++) {
    const { sign, term } = terms[i];
    if (i === 0) {
      expansion += (sign === '-' ? '-' : '') + term;
    } else {
      expansion += ` ${sign} ${term}`;
    }
  }
  
  // Also show in sigma notation
  const sigmaNotation = `Σ(k=0 to ${n}) [${n}Ck * (${formatCoefficient(a)}${variable})^(${n}-k) * (${b})^k]`;
  
  return `**Expansion:** ${expansion}\n\n**Sigma Notation:** ${sigmaNotation}\n\n**Total Terms:** ${terms.length}`;
}

function findSpecificCoefficient(a, b, variable, n, termInput, steps) {
  let k;
  
  // Check if termInput is a power of the variable or term number
  if (termInput >= 0 && termInput <= n) {
    // Assuming termInput is the term number (starting from 1)
    k = termInput - 1;
    if (k < 0) k = 0;
    steps.push(`Finding coefficient of term ${termInput} (k=${k})`);
  } else {
    // Assume termInput is the power of the variable
    const power = termInput;
    k = n - power;
    if (k < 0 || k > n) {
      throw new Error(`Invalid power. For (${a}${variable}+${b})^${n}, power of ${variable} can be 0 to ${n}`);
    }
    steps.push(`Finding coefficient of ${variable}^${power} (k=${k})`);
  }
  
  const nCk = binomialCoefficient(n, k);
  const coeff = nCk * Math.pow(a, n - k) * Math.pow(b, k);
  
  steps.push(`nC${k} = ${nCk}`);
  steps.push(`Coefficient of (${a}${variable})^(${n}-${k}) = ${a}^${n-k} = ${Math.pow(a, n-k)}`);
  steps.push(`Coefficient of (${b})^${k} = ${b}^${k} = ${Math.pow(b, k)}`);
  steps.push(`Total coefficient = ${nCk} × ${Math.pow(a, n-k)} × ${Math.pow(b, k)}`);
  
  const exactCoeff = nCk * Math.pow(a, n - k) * Math.pow(b, k);
  let termStr = '';
  
  if (n - k > 0) {
    const coeffPart = formatCoefficient(Math.abs(exactCoeff));
    termStr = `${coeffPart}${variable}`;
    if (n - k > 1) termStr += `^${n - k}`;
  } else {
    termStr = Math.abs(exactCoeff).toString();
  }
  
  return `**Coefficient:** ${exactCoeff}\n**Term:** ${exactCoeff >= 0 ? '' : '-'}${termStr}`;
}

function findGeneralTerm(a, b, variable, n, steps) {
  steps.push(`General term formula: T_(k+1) = nCk * (first term)^(n-k) * (second term)^k`);
  steps.push(`Where k = 0, 1, 2, ..., ${n}`);
  
  const generalTerm = `T_(k+1) = ${n}Ck * (${formatCoefficient(a)}${variable})^(${n}-k) * (${b})^k`;
  
  // Simplify if possible
  let simplified = generalTerm;
  if (a === 1) {
    simplified = simplified.replace(`(1${variable})`, variable);
  }
  if (a === -1) {
    simplified = simplified.replace(`(-1${variable})`, `-${variable}`);
  }
  
  return `**General Term:** ${simplified}\n\n**Range:** k = 0, 1, 2, ..., ${n}\n**Total Terms:** ${n + 1}`;
}

function findMiddleTerms(a, b, variable, n, steps) {
  steps.push(`Number of terms in expansion: ${n + 1}`);
  
  if (n % 2 === 0) {
    // Even power: one middle term
    const middleTerm = n / 2;
    steps.push(`Even power (n=${n}) → One middle term at position: ${middleTerm + 1}`);
    
    const k = middleTerm;
    const nCk = binomialCoefficient(n, k);
    const coeff = nCk * Math.pow(a, n - k) * Math.pow(b, k);
    
    let termStr = '';
    if (n - k > 0) {
      const coeffPart = formatCoefficient(Math.abs(coeff));
      termStr = `${coeffPart}${variable}`;
      if (n - k > 1) termStr += `^${n - k}`;
    } else {
      termStr = Math.abs(coeff).toString();
    }
    
    return `**One middle term:**\nTerm ${middleTerm + 1} (k=${k})\nValue: ${coeff >= 0 ? '' : '-'}${termStr}\nCoefficient: ${coeff}`;
  } else {
    // Odd power: two middle terms
    const term1 = Math.floor(n / 2);
    const term2 = term1 + 1;
    steps.push(`Odd power (n=${n}) → Two middle terms at positions: ${term1 + 1} and ${term2 + 1}`);
    
    let result = `**Two middle terms:**\n`;
    
    // First middle term
    const k1 = term1;
    const nCk1 = binomialCoefficient(n, k1);
    const coeff1 = nCk1 * Math.pow(a, n - k1) * Math.pow(b, k1);
    
    let termStr1 = '';
    if (n - k1 > 0) {
      const coeffPart1 = formatCoefficient(Math.abs(coeff1));
      termStr1 = `${coeffPart1}${variable}`;
      if (n - k1 > 1) termStr1 += `^${n - k1}`;
    } else {
      termStr1 = Math.abs(coeff1).toString();
    }
    
    result += `1. Term ${term1 + 1} (k=${k1}): ${coeff1 >= 0 ? '' : '-'}${termStr1}, Coefficient: ${coeff1}\n`;
    
    // Second middle term
    const k2 = term2;
    const nCk2 = binomialCoefficient(n, k2);
    const coeff2 = nCk2 * Math.pow(a, n - k2) * Math.pow(b, k2);
    
    let termStr2 = '';
    if (n - k2 > 0) {
      const coeffPart2 = formatCoefficient(Math.abs(coeff2));
      termStr2 = `${coeffPart2}${variable}`;
      if (n - k2 > 1) termStr2 += `^${n - k2}`;
    } else {
      termStr2 = Math.abs(coeff2).toString();
    }
    
    result += `2. Term ${term2 + 1} (k=${k2}): ${coeff2 >= 0 ? '' : '-'}${termStr2}, Coefficient: ${coeff2}`;
    
    return result;
  }
}

function findSumOfCoefficients(a, b, n, steps) {
  // Sum of coefficients = (a + b)^n
  steps.push(`Sum of coefficients = (coefficient of a + coefficient of b)^n`);
  steps.push(`= (${a} + ${b})^${n} = ${a + b}^${n}`);
  
  const sum = Math.pow(a + b, n);
  
  // Alternative: sum of binomial coefficients = 2^n
  const sumBinomialCoeffs = Math.pow(2, n);
  steps.push(`Sum of binomial coefficients (nCk) = 2^${n} = ${sumBinomialCoeffs}`);
  
  return `**Sum of coefficients:** ${sum}\n**Sum of binomial coefficients:** ${sumBinomialCoeffs}`;
}

function findGreatestCoefficient(a, b, n, steps) {
  steps.push(`Finding greatest coefficient in the expansion...`);
  
  const coefficients = [];
  
  for (let k = 0; k <= n; k++) {
    const nCk = binomialCoefficient(n, k);
    const coeff = nCk * Math.pow(a, n - k) * Math.pow(b, k);
    coefficients.push({ k, coeff: Math.abs(coeff), signedCoeff: coeff });
  }
  
  // Find maximum
  let maxCoeff = -Infinity;
  let maxIndex = -1;
  
  for (let i = 0; i < coefficients.length; i++) {
    if (coefficients[i].coeff > maxCoeff) {
      maxCoeff = coefficients[i].coeff;
      maxIndex = i;
    }
  }
  
  const { k: maxK, signedCoeff } = coefficients[maxIndex];
  
  steps.push(`Coefficients: ${coefficients.map(c => c.signedCoeff).join(', ')}`);
  steps.push(`Maximum at k = ${maxK} (term ${maxK + 1})`);
  
  return `**Greatest Coefficient:** ${signedCoeff}\n**Occurs at:** Term ${maxK + 1} (k = ${maxK})\n**Absolute Value:** ${maxCoeff}`;
}

module.exports = { executeBinomial };