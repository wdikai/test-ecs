const Component = require("./Component");

module.exports = class EntityFilter {
    static lastId = 0;

    /**
     * @param {World} world
     * @param {Array<typeof Component>}} [componentsMask]
     */
    constructor(world, componentsMask = []) {
        this.entities = [];
        this.world = world;
        this.componentsMask = componentsMask;
        this.subscriptions = [
            this.world.onEntityAdded.on(entity => this.onNewEntity(entity)),
            this.world.onComponentAddedToEntity.on(entity => this.onNewEntity(entity)),
            this.world.onEntityRemoved.on(entity => this.onEntityRemoved(entity)),
            this.world.onComponentRemovedFromEntity.on(
                (entity, removedComponent) => this.onEntityComponentRemoved(entity, removedComponent)
            )
        ];
        this.world.entities.forEach(entity => this.onNewEntity(entity));
    }

    /**
     * Handle new entity event
     * @param {Entity} entity
     */
    onNewEntity(entity) {
        const supported = this.componentsMask
            .map(componentType => entity.components.has(componentType))
            .reduce((result, component) => result && component, true);

        if (supported && !this.entities.includes(entity)) {
            this.entities.push(entity);
        }
    }

    /**
     * Handle destroy entity event
     * @param {Entity} entity
     */
    onEntityRemoved(entity) {
        const index = this.entities.indexOf(entity);
        if (index) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Handle remove component from the entity event
     * @param {Entity} entity
     */
    onEntityComponentRemoved(entity, removedComponent) {
        const index = this.entities.indexOf(entity);
        const supported = this.componentsMask.find(componentType => removedComponent instanceof componentType);

        if (index && !supported) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Dispose filter
     */
    dispose() {
        this.entities = [];
        this.world = null;
        this.subscriptions.forEach(unsubscribe => unsubscribe());
    }
}
