module.exports = class EventHandler {
    /**
     * @type {Function}
     */
    static NO_ACTION = () => { };

    constructor() {
        this.callbacks = [];
    }

    /**
     * Add event subscription
     * @param {Function} fn - subscribtion function
     * @returns {Function} unsubscribe function
     */
    on(fn = EventHandler.NO_ACTION) {
        this.callbacks.push(fn);

        return () => {
            const index = this.callbacks.findIndex(fn);
            if (index) {
                this.callbacks.splice(index, 1);
            }
        };
    }

    /**
     * Emit event
     * @param  {...any} data - list of event params
     */
    emit(...data) {
        this.callbacks.forEach(callback => callback(...data));
    }

    /**
     * Unsubscribe from all subscriptions
     */
    removeAll() {
        this.callbacks = [];
    }
}
