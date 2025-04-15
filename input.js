export class InputHandler {
  constructor() {
    // saving the keys that are pressed
    this.keys = [];
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
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.keys.includes(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
