const math = require('mathjs');

async function executeComplex(interaction) {
  await interaction.deferReply();
  
  const subcommand = interaction.options.getSubcommand();
  
  try {
    let result = '';
    let formula = '';
    let calculation = '';
    let complexResult = null;
    
    switch (subcommand) {
      case 'add':
        const real1_add = interaction.options.getNumber('real1');
        const imag1_add = interaction.options.getNumber('imag1');
        const real2_add = interaction.options.getNumber('real2');
        const imag2_add = interaction.options.getNumber('imag2');
        
        const sumReal = real1_add + real2_add;
        const sumImag = imag1_add + imag2_add;
        
        formula = '(a + bi) + (c + di) = (a+c) + (b+d)i';
        calculation = `(${real1_add} + ${imag1_add}i) + (${real2_add} + ${imag2_add}i)`;
        result = `${sumReal} + ${sumImag}i`;
        
        if (sumImag === 0) result = `${sumReal}`;
        else if (sumImag < 0) result = `${sumReal} - ${Math.abs(sumImag)}i`;
        
        break;
        
      case 'subtract':
        const real1_sub = interaction.options.getNumber('real1');
        const imag1_sub = interaction.options.getNumber('imag1');
        const real2_sub = interaction.options.getNumber('real2');
        const imag2_sub = interaction.options.getNumber('imag2');
        
        const diffReal = real1_sub - real2_sub;
        const diffImag = imag1_sub - imag2_sub;
        
        formula = '(a + bi) - (c + di) = (a-c) + (b-d)i';
        calculation = `(${real1_sub} + ${imag1_sub}i) - (${real2_sub} + ${imag2_sub}i)`;
        result = `${diffReal} + ${diffImag}i`;
        
        if (diffImag === 0) result = `${diffReal}`;
        else if (diffImag < 0) result = `${diffReal} - ${Math.abs(diffImag)}i`;
        
        break;
        
      case 'multiply':
        const real1_mul = interaction.options.getNumber('real1');
        const imag1_mul = interaction.options.getNumber('imag1');
        const real2_mul = interaction.options.getNumber('real2');
        const imag2_mul = interaction.options.getNumber('imag2');
        
        const productReal = (real1_mul * real2_mul) - (imag1_mul * imag2_mul);
        const productImag = (real1_mul * imag2_mul) + (imag1_mul * real2_mul);
        
        formula = '(a + bi)(c + di) = (ac - bd) + (ad + bc)i';
        calculation = `(${real1_mul} + ${imag1_mul}i) × (${real2_mul} + ${imag2_mul}i)`;
        result = `${productReal} + ${productImag}i`;
        
        if (productImag === 0) result = `${productReal}`;
        else if (productImag < 0) result = `${productReal} - ${Math.abs(productImag)}i`;
        
        break;
        
      case 'divide':
        const real1_div = interaction.options.getNumber('real1');
        const imag1_div = interaction.options.getNumber('imag1');
        const real2_div = interaction.options.getNumber('real2');
        const imag2_div = interaction.options.getNumber('imag2');
        
        const denominator = (real2_div * real2_div) + (imag2_div * imag2_div);
        
        if (denominator === 0) {
          throw new Error('Cannot divide by zero complex number');
        }
        
        const quotientReal = ((real1_div * real2_div) + (imag1_div * imag2_div)) / denominator;
        const quotientImag = ((imag1_div * real2_div) - (real1_div * imag2_div)) / denominator;
        
        formula = '(a+bi)/(c+di) = [(ac+bd)+(bc-ad)i]/(c²+d²)';
        calculation = `(${real1_div} + ${imag1_div}i) ÷ (${real2_div} + ${imag2_div}i)`;
        result = `${quotientReal.toFixed(4)} + ${quotientImag.toFixed(4)}i`;
        
        if (quotientImag === 0) result = `${quotientReal.toFixed(4)}`;
        else if (quotientImag < 0) result = `${quotientReal.toFixed(4)} - ${Math.abs(quotientImag).toFixed(4)}i`;
        
        break;
        
      case 'conjugate':
        const real_conj = interaction.options.getNumber('real');
        const imag_conj = interaction.options.getNumber('imag');
        
        formula = 'Conjugate of a+bi = a - bi';
        calculation = `Conjugate of ${real_conj} + ${imag_conj}i`;
        result = `${real_conj} - ${imag_conj}i`;
        
        if (imag_conj === 0) result = `${real_conj}`;
        
        break;
        
      case 'magnitude':
        const real_mag = interaction.options.getNumber('real');
        const imag_mag = interaction.options.getNumber('imag');
        
        const magnitude = Math.sqrt((real_mag * real_mag) + (imag_mag * imag_mag));
        
        formula = '|a+bi| = √(a² + b²)';
        calculation = `|${real_mag} + ${imag_mag}i| = √(${real_mag}² + ${imag_mag}²)`;
        result = magnitude.toFixed(4);
        
        break;
        
      case 'argument':
        const real_arg = interaction.options.getNumber('real');
        const imag_arg = interaction.options.getNumber('imag');
        
        let argument = Math.atan2(imag_arg, real_arg);
        
        formula = 'arg(a+bi) = atan2(b, a)';
        calculation = `arg(${real_arg} + ${imag_arg}i) = atan2(${imag_arg}, ${real_arg})`;
        result = `${argument.toFixed(4)} radians`;
        
        // Also show in degrees
        const degrees = (argument * 180 / Math.PI).toFixed(2);
        result += ` (≈ ${degrees}°)`;
        
        break;
        
      case 'polar':
        const real_pol = interaction.options.getNumber('real');
        const imag_pol = interaction.options.getNumber('imag');
        
        const r = Math.sqrt((real_pol * real_pol) + (imag_pol * imag_pol));
        const theta = Math.atan2(imag_pol, real_pol);
        
        formula = 'a+bi = r(cosθ + i sinθ) where r = √(a²+b²), θ = atan2(b,a)';
        calculation = `${real_pol} + ${imag_pol}i`;
        result = `r = ${r.toFixed(4)}, θ = ${theta.toFixed(4)} rad`;
        result += `\nPolar form: ${r.toFixed(4)}(cos(${theta.toFixed(4)}) + i sin(${theta.toFixed(4)}))`;
        result += `\nExponential form: ${r.toFixed(4)}e^(i${theta.toFixed(4)})`;
        
        break;
        
      case 'rectangular':
        const magnitude_rec = interaction.options.getNumber('magnitude');
        const angle_rec = interaction.options.getNumber('angle');
        
        const real_rec = magnitude_rec * Math.cos(angle_rec);
        const imag_rec = magnitude_rec * Math.sin(angle_rec);
        
        formula = 'r(cosθ + i sinθ) = r cosθ + i r sinθ';
        calculation = `${magnitude_rec}(cos(${angle_rec}) + i sin(${angle_rec}))`;
        result = `${real_rec.toFixed(4)} + ${imag_rec.toFixed(4)}i`;
        
        if (imag_rec === 0) result = `${real_rec.toFixed(4)}`;
        else if (imag_rec < 0) result = `${real_rec.toFixed(4)} - ${Math.abs(imag_rec).toFixed(4)}i`;
        
        break;
        
      case 'power':
        const real_pow = interaction.options.getNumber('real');
        const imag_pow = interaction.options.getNumber('imag');
        const power = interaction.options.getNumber('power');
        
        // Convert to polar form
        const r_pow = Math.sqrt((real_pow * real_pow) + (imag_pow * imag_pow));
        const theta_pow = Math.atan2(imag_pow, real_pow);
        
        // Apply De Moivre's theorem
        const r_result = Math.pow(r_pow, power);
        const theta_result = theta_pow * power;
        
        // Convert back to rectangular
        const real_result = r_result * Math.cos(theta_result);
        const imag_result = r_result * Math.sin(theta_result);
        
        formula = '(r(cosθ + i sinθ))ⁿ = rⁿ(cos(nθ) + i sin(nθ))';
        calculation = `(${real_pow} + ${imag_pow}i)^${power}`;
        result = `${real_result.toFixed(4)} + ${imag_result.toFixed(4)}i`;
        
        if (imag_result === 0) result = `${real_result.toFixed(4)}`;
        else if (imag_result < 0) result = `${real_result.toFixed(4)} - ${Math.abs(imag_result).toFixed(4)}i`;
        
        // Also show polar form
        result += `\nPolar: ${r_result.toFixed(4)}e^(i${theta_result.toFixed(4)})`;
        
        break;
        
      case 'roots':
        const real_root = interaction.options.getNumber('real');
        const imag_root = interaction.options.getNumber('imag');
        const n = interaction.options.getInteger('n');
        
        // Convert to polar form
        const r_root = Math.sqrt((real_root * real_root) + (imag_root * imag_root));
        const theta_root = Math.atan2(imag_root, real_root);
        
        formula = 'nth roots: r^(1/n)[cos((θ+2πk)/n) + i sin((θ+2πk)/n)], k=0..n-1';
        calculation = `Find ${n} roots of ${real_root} + ${imag_root}i`;
        
        const r_nth = Math.pow(r_root, 1/n);
        let rootsText = '';
        
        for (let k = 0; k < n; k++) {
          const angle = (theta_root + 2 * Math.PI * k) / n;
          const real_k = r_nth * Math.cos(angle);
          const imag_k = r_nth * Math.sin(angle);
          
          let rootStr = `${real_k.toFixed(4)} + ${imag_k.toFixed(4)}i`;
          if (imag_k === 0) rootStr = `${real_k.toFixed(4)}`;
          else if (imag_k < 0) rootStr = `${real_k.toFixed(4)} - ${Math.abs(imag_k).toFixed(4)}i`;
          
          rootsText += `**Root ${k+1}:** ${rootStr}\n`;
          rootsText += `Polar: ${r_nth.toFixed(4)}e^(i${angle.toFixed(4)})\n\n`;
        }
        
        result = rootsText;
        break;
        
      case 'evaluate':
        const expression = interaction.options.getString('expression');
        
        // Replace i with complex(0,1) for math.js
        const mathjsExpression = expression.replace(/i/g, 'complex(0,1)');
        
        try {
          const evalResult = math.evaluate(mathjsExpression);
          
          formula = 'Evaluating complex expression';
          calculation = expression;
          
          if (typeof evalResult === 'object' && evalResult.re !== undefined && evalResult.im !== undefined) {
            const realEval = evalResult.re;
            const imagEval = evalResult.im;
            
            if (imagEval === 0) {
              result = `${realEval}`;
            } else if (imagEval < 0) {
              result = `${realEval} - ${Math.abs(imagEval)}i`;
            } else {
              result = `${realEval} + ${imagEval}i`;
            }
            
            // Also show magnitude
            const magnitudeEval = Math.sqrt(realEval * realEval + imagEval * imagEval);
            result += `\nMagnitude: ${magnitudeEval.toFixed(4)}`;
          } else {
            result = `Result: ${evalResult}`;
          }
        } catch (evalError) {
          throw new Error(`Invalid expression: ${evalError.message}`);
        }
        break;
        
      default:
        throw new Error('Unknown subcommand');
    }
    
    const response = `🔢 **Complex Numbers - ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}**\n\n**Formula:** ${formula}\n**Calculation:** ${calculation}\n\n**Result:**\n${result}`;
    
    await interaction.editReply(response);
    
  } catch (error) {
    await interaction.editReply(`❌ **Error in complex number operation**\n\n**Error:** ${error.message}\n\n💡 **Usage examples:**\n• \`/complex add real1:3 imag1:4 real2:1 imag2:2\`\n• \`/complex multiply real1:2 imag1:3 real2:1 imag2:-1\`\n• \`/complex magnitude real:3 imag:4\`\n• \`/complex evaluate expression:"(3+4i)*(2-i)"\``);
  }
}

module.exports = { executeComplex };