const Entity = require("./Entity.js");
const EventHandler = require("../utils/EventHandler");

module.exports = class World {
    constructor() {
        this.entities = [];
        this.entitieMap = new Map();

        this.onEntityAdded = new EventHandler();
        this.onEntityRemoved = new EventHandler();
        this.onComponentAddedToEntity = new EventHandler();
        this.onComponentRemovedFromEntity = new EventHandler();
    }

    /**
     * Create new entity
     * @param {String} [name] - unique name of the entity
     * @returns {Entity}
     */
    ceateEntity(name) {
        if(name && this.entitieMap.has(name)) {
            throw new Error(`Entity ${name} has been already registered`);
        }

        const entity = new Entity(this, name);
        
        this.entities.push(entity);
        this.entitieMap.set(entity.name, entity);

        entity.onAddComponent.on(component => this.onComponentAddedToEntity.emit(entity, component));
        entity.onRemoveComponent.on(component => this.onComponentRemovedFromEntity.emit(entity, component));
        this.onEntityAdded.emit(entity);

        return entity;
    }

    /**
     * @param {String} name 
     * @returns 
     */
    getEntity(name) {
        return this.entitieMap.get(name);
    }

    /**
     * Remove entity
     */
    removeEntity(entity) {
        if (!entity || !(entity instanceof Entity)) {
            throw new TypeError("Expect value of Entity type");
        }

        const index = this.entities.findIndex(entity);
        if (index) {
            this.entitys.splice(index, 1);
            this.onEntityRemoved.emit(entity);
        }
    }
}
