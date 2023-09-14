export default class InputHandler {
  constructor() {
    this.keyCodes = [];

    window.addEventListener("keydown", (e) => {
      if (
        e.repeat === false &&
        (e.code === "ArrowLeft" ||
          e.code === "ArrowRight" ||
          e.code === "ArrowUp" ||
          e.code === "Space") &&
        this.keyCodes.indexOf(e.code) === -1
      ) {
        this.keyCodes.push(e.code);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft" || "ArrowRight" || "ArrowUp" || "Space") {
        this.keyCodes.splice(this.keyCodes.indexOf(e.code), 1);
      }
    });
  }
}
