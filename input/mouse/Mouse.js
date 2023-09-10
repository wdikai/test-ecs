module.exports = class Keyboard {
    constructor() {
        this.x = null;
        this.y = null;
        this.keys = new Map();
        this.onUpHandler = event => this.onUp(event);
        this.onDownHandler = event => this.onDown(event);
        this.onMoveHandler = event => this.onMove(event);
    }

    init() {
        window.addEventListener('mouseup', this.onUpHandler);
        window.addEventListener('mousedown', this.onDownHandler);
        window.addEventListener('mousemove', this.onMoveHandler); 
    }

    isPressed(code) {
        return this.keys.has(code) && this.keys.get(code).isPressed;
    }

    isClicked(code) {
        return this.keys.has(code) && this.keys.get(code).isClicked;
    }

    update() {
        this.keys.forEach(key => key.update());
    }

    onDown(event) {
        event.preventDefault();
        const button = event.button;
        const key = this.keys.get(button) || new KeyState(button);
        key.onDown();
        this.keys.set(code, key);
    }

    onUp(event) {
        event.preventDefault();
        const button = event.button;
        const key = this.keys.get(button) || new KeyState(button);
        key.onUp();
        this.keys.set(code, key);
    }

    onMove(event) {
        this.x = event.movementX;
        this.y = event.movementY;
    }

    dispose() {
        window.removeEventListener('mouseup', this.onUpHandler);
        window.removeEventListener('mousedown', this.onDownHandler);
        window.removeEventListener('mousemove', this.onMoveHandler); 
    }
}
