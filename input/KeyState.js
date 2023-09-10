module.exports = class KeyState {
    constructor(code) {
        this.code = code;
        this.isPressed = false;
        this.isClicked = false;
    }

    onDown() {
        this.isPressed = true;
        this.isClicked = true;
    }

    onUp() {
        this.isPressed = false;
        this.isClicked = false;
    }

    update() {
        this.isClicked = true;
    }
}
