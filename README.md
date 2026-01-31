# Math Bot - Discord Mathematics Calculator

A powerful Discord bot that performs comprehensive mathematical calculations, from basic arithmetic to advanced algebra, geometry, trigonometry, complex numbers, and binomial expansions.

## Features

### 📊 Core Commands

- **`/math`** - Evaluate mathematical expressions with support for functions like sin, cos, sqrt, log, etc.
- **`/statistics`** - Calculate statistical measures (mean, median, mode, standard deviation, variance, quartiles, IQR)
- **`/convert`** - Convert between various units (length, weight, volume, temperature, area, speed)
- **`/solve`** - Solve mathematical equations (linear and complex)
- **`/help`** - Interactive help system with command search and categories

### 📐 Geometry

- **`/area`** - Calculate area of circles, triangles, rectangles, squares, trapezoids (including Heron's formula)
- **`/perimeter`** - Calculate perimeter/circumference of shapes
- **`/volume`** - Calculate volume of 3D shapes (cube, sphere, cylinder, cone)

### 📏 Advanced Mathematics

- **`/trigonometry`** - Sine, cosine, tangent, and Pythagorean theorem calculations
- **`/algebra`** - Quadratic equations, distance between points, line slopes
- **`/complex`** - Complex number operations (add, subtract, multiply, divide, magnitude, polar form, powers, roots, etc.)
- **`/binomial`** - Binomial expansion, coefficients, middle terms, sum of coefficients

## Installation

### Prerequisites

- Node.js 16.9.0 or higher
- npm (Node Package Manager)
- A Discord bot token and client ID

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/PgNetwork01/math-bot.git
   cd math-bot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy .env.example to .env:

     ```bash
     cp .env.example .env
     ```

   - Edit .env and add your Discord bot credentials:

     ```
     DISCORD_TOKEN=your_bot_token_here
     CLIENT_ID=your_bot_client_id_here
     ```

4. **Register commands:**

    ```bash
    # Register commands globally (takes up to 1 hour to propagate)
    npm run register-global
    
    # Or register commands to a specific server (instant)
    npm run register-guild
    ```

    In the [package.json](package.json) update the guild ID to yours.


5. **Start the bot:**

   ```bash
   npm start
   ```

6. **Easy way:**
    If you dont want to do all the steps, setup a new bot you can use my prebuild bot. [Click here to install](https://discord.com/oauth2/authorize?client_id=1432407838122184766)

## Usage Examples

### Basic Calculations

```
/math expression:2+2*5
/math expression:sin(45)*sqrt(16)
/math expression:2*pi*5^2
```

### Statistics

```
/statistics numbers:1 2 3 4 5
/statistics numbers:10,20,30,40,50
```

### Geometry

```
/area circle radius:5
/area triangle base:10 height:8
/perimeter rectangle length:10 width:8
/volume sphere radius:3
```

### Advanced Mathematics

```
/solve equation:2*x + 5 = 13
/trigonometry sin angle:30
/trigonometry pythagoras find:hypotenuse a:3 b:4
/algebra quadratic a:1 b:-3 c:2
/complex multiply real1:2 imag1:3 real2:1 imag2:-1
/binomial expand expression:"(x+2)^5"
```

### Unit Conversions

```
/convert value:100 from:cm to:m
/convert value:32 from:fahrenheit to:celsius
```

## Commands Summary

| Command | Subcommands | Purpose |
|---------|------------|---------|
| `/math` | N/A | General expression evaluation |
| `/statistics` | N/A | Statistical analysis |
| `/convert` | N/A | Unit conversion |
| `/solve` | N/A | Equation solving |
| `/help` | N/A | Interactive help menu |
| `/area` | circle, triangle, triangle-heron, rectangle, square, trapezoid | Area calculations |
| `/perimeter` | circle, triangle, rectangle, square | Perimeter calculations |
| `/volume` | cube, sphere, cylinder, cone | Volume calculations |
| `/trigonometry` | sin, cos, tan, pythagoras | Trigonometric functions |
| `/algebra` | quadratic, distance, slope | Algebraic operations |
| `/complex` | add, subtract, multiply, divide, conjugate, magnitude, argument, polar, rectangular, power, roots, evaluate | Complex number operations |
| `/binomial` | expand, coefficient, general_term, middle_term, sum_coefficients, greatest_coefficient | Binomial operations |

## Supported Operations

### Mathematical Functions

- Basic: `+`, `-`, `*`, `/`, `^`
- Trigonometric: `sin()`, `cos()`, `tan()`
- Logarithmic: `log()`, `ln()`
- Other: `sqrt()`, `abs()`, `round()`, `floor()`, `ceil()`
- Constants: `pi`, `e`

### Unit Categories

- **Length:** mm, cm, m, km, inch, ft, yd, mile
- **Weight:** mg, g, kg, oz, lb, ton
- **Volume:** ml, l, cup, pint, gallon
- **Temperature:** celsius, fahrenheit, kelvin
- **Area:** m², km², hectare, acre, ft²
- **Speed:** m/s, km/h, mph, knot

## Project Structure

```
math-bot/
├── bot.js                 # Main bot file
├── register-commands.js   # Command registration script
├── package.json          # Dependencies and scripts
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── commands/
    ├── command-list.js   # All slash command definitions
    ├── math.js           # Math calculations
    ├── statistics.js     # Statistical analysis
    ├── convert.js        # Unit conversion
    ├── solve.js          # Equation solver
    ├── help.js           # Interactive help system
    ├── area.js           # Area calculations
    ├── perimeter.js      # Perimeter calculations
    ├── volume.js         # Volume calculations
    ├── trigonometry.js   # Trigonometric functions
    ├── algebra.js        # Algebraic operations
    ├── complex.js        # Complex number operations
    └── binomial.js       # Binomial expansions
```

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses `nodemon` to automatically restart the bot when files change.

### Scripts Available

- `npm start` - Run the bot
- `npm run register` - Register commands to guild
- `npm run register-global` - Register commands globally
- `npm run dev` - Run with automatic restart on file changes

## Dependencies

- **discord.js** - Discord API library
- **mathjs** - Mathematical expression evaluation
- **dotenv** - Environment variable management
- **cross-env** - Cross-platform environment variable support

## Features in Detail

### Interactive Help System

- Search for specific commands
- Browse by category
- View detailed command information with examples
- Navigate through all available commands with pagination

### Error Handling

- error messages with usage examples
- Input validation for all operations
- Support for multiple input formats (spaces, commas, etc.)

### Advanced Calculations

- Complex number operations with multiple representations
- Binomial expansion with step-by-step solutions
- Statistical analysis with quartiles and IQR
- Equation solving with numerical methods

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - See LICENSE file for details

## Author

**Pg Network**

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Math Bot** - Making mathematics accessible on Discord! LoL
