// Do nothing model.

// CREATE
var model = new Model("nothing")
model.createDOM()
// CONFIGURE
model.preFrontrunnerIds = []
// INIT
model.initDOM()
// INIT
model.initPlugin()
model.arena.redistrict()
// UPDATE
model.update()
console.log(model)