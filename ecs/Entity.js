const EventHandler = require("../utils/EventHandler");
const Component = require("./Component.js");

module.exports = class Entity {
    static lastId = 0;

    constructor(world, name) {
        this.id = ++Entity.lastId;
        this.name = name || `ENTITY_NAME_${this.id}`;
        this.components = new WeakMap();
        this.world = world;
        this.onAddComponent = new EventHandler();
        this.onRemoveComponent = new EventHandler();
    }

    /**
     * Add component to the entity
     * @param {Component} component
     * @returns {Entity}
     */
    addComponent(component) {
        if (!component || !(component instanceof Component)) {
            throw new TypeError("Expect value of Component type");
        }

        this.components.set(component.constructor, component);
        this.onAddComponent.emit(component);
        return this;
    }

    /**
     * Get component from the entity
     * @param {typeof Component} componentType 
     * @returns 
     */
    getComponent(componentType) {
        return this.components.get(componentType);
    }

    /**
     * Remove component from the entity
     * @param {Component} component
     * @returns {Entity}
     */
    removeComponent(component) {
        if (!component || !(component instanceof Component)) {
            throw new TypeError("Expect value of Component type");
        }

        const index = this.components.findIndex(component);
        if (index) {
            this.components.splice(index, 1);
            this.onRemoveComponent.emit(component);
        }

        return this;
    }

    /**
     * Dispose entity, unsubscribe all subscriptions. Remove relations.
     */
    dispose() {
        this.components = null;
        this.world.removeEntity(this);
        this.onAddComponent.removeAll();
        this.onRemoveComponent.removeAll();
        this.world = null;
    }
}
