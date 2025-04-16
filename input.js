export class InputHandler {
  constructor(game) {
    // saving the keys that are pressed
    this.keys = [];
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowLeft" ||

          e.key === "ArrowRight" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "Enter") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.keys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
