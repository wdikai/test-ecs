    const System = require("./System");

    module.exports = class SystemManager extends System {
        constructor(world) {
            this.world = world;
            this.systems = [];
        }

        /**
         * Register the system
         * @param {System} system
         * @returns {World}
         */
        addSystem(system) {
            if (!system || !(system instanceof System)) {
                throw new TypeError("Expect value of Entity type");
            }

            this.systems.push(system);
            return this;
        }

        /**
         * Init system manager
         */
        init() {
            this.systems.forEach(system => system.init());
        }

        /**
         * Run all systems
         */
        run() {
            this.systems.forEach(system => system.run());
        }

        /**
         * Destroy systems
         */
        destroy() {
            this.systems.forEach(system => system.destroy());
            this.systems = [];
        }
    }
