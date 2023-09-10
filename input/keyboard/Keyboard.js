module.exports = class Keyboard {
    constructor() {
        this.keys = new Map();
        this.onUpHandler = event => this.onUp(event);
        this.onDownHandler = event => this.onDown(event);
    }

    init() {
        document.addEventListener("keyup", this.onUpHandler);
        document.addEventListener("keydown", this.onDownHandler);
    }

    isPressed(code) {
        return this.keys.has(code) && this.keys.get(code).ifPressed;
    }

    isClicked(code) {
        return this.keys.has(code) && this.keys.get(code).isClicked;
    }

    update() {
        this.keys.forEach(key => key.update());
    }

    onDown(event) {
        event.preventDefault();
        const code = event.keyCode;
        const key = this.keys.get(code) || new KeyState(code);
        key.onDown();
        this.keys.set(code, key);
    }

    onUp(event) {
        event.preventDefault();
        const code = event.keyCode;
        const key = this.keys.get(code) || new KeyState(code);
        key.onUp();
        this.keys.set(code, key);
    }

    dispose() {
        document.removeEventListener("keyup", this.onUpHandler);
        document.EventListener("keydown", this.onDownHandler);
    }
}
