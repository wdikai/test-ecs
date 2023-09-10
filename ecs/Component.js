module.exports = class Component {
    static lastId = 0;

    constructor() {
        this.id = ++Component.lastId;
    }
}
