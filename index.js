const World = require("./ecs/World");
const Component = require("./ecs/Component");
const Entity = require("./ecs/Entity");
const EntityFilter = require("./ecs/EntityFilter");

class TestComponentOne extends Component {}
class TestComponentTwo extends Component {}

const world = new World();
const filterOne = new EntityFilter(world, [TestComponentOne]);
const filterTwo = new EntityFilter(world, [TestComponentTwo]);
const filterTree = new EntityFilter(world);

world
    .ceateEntity('Player')
    .addComponent(new TestComponentOne());

for(let i = 0; i < 2 * 2; i++)
    world
        .ceateEntity(`Enemy(${i})`)
        .addComponent(new TestComponentTwo());

console.log(world.entities.map(entity => entity.name));
console.log(filterOne.entities.map(entity => entity.name));
console.log(filterTwo.entities.map(entity => entity.name));
console.log(filterTree.entities.map(entity => entity.name));

console.log(world.getEntity('player')?.name);