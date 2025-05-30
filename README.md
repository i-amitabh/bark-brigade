# Bark Brigade - 2D Platformer Game

A fun and engaging 2D platformer game built with JavaScript Canvas. Control a character through various obstacles and enemies while collecting points.

## Features

- Smooth character animations with multiple states (sitting, running, jumping, falling, rolling)
- Dynamic particle effects (dust trails)
- Multiple enemy types (flying, ground, climbing)
- Score tracking system
- Collision detection
- Debug mode for development

## Controls

- **Arrow Left/Right**: Move character left/right
- **Arrow Up**: Jump
- **Arrow Down**: Sit
- **Enter**: Roll attack
- **D**: Toggle debug mode (shows hitboxes)

## Technical Details

The game is built using vanilla JavaScript and HTML5 Canvas. It implements:

- Object-oriented programming principles (Creational, Structural, Behavioral)
- State pattern for character behavior
- Particle system for visual effects
- Sprite animation system
- Collision detection algorithms
- Event-based input handling

## Project Structure

- `main.js`: Game initialization and main game loop
- `player.js`: Player character implementation
- `playerStates.js`: Character state management
- `enemies.js`: Enemy types and behaviors
- `particles.js`: Particle system implementation
- `input.js`: Input handling system
- `UI.js`: User interface elements
- `background.js`: Background rendering

## Setup

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Start playing!

## Requirements

- Modern web browser with JavaScript enabled
- No additional dependencies required

## Development

To modify or extend the game:

1. The game uses a modular structure, making it easy to add new features
2. Debug mode (press 'D') shows hitboxes and can help with development
3. New states can be added in `playerStates.js`
4. New enemy types can be added in `enemies.js`

## License

This project is open source and available for personal and educational use.
