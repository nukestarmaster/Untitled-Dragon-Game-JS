import { Yield } from "../classes/counter.js"
import { Action, ActionManager, Building, LimitAction } from "../classes/action.js"
import { Cost } from "../classes/counter.js"
import { Collection } from "../classes/collection.js"
/*
(name, 
max, 
visible, 
limited = false, 
remaining = 1, 
initCost = [], 
progCost = [], 
progYield = [], 
progSpeed = 0, 
compYeild = []) */

const breakEgg = new LimitAction(
    "Break Egg", 
    1,
    "eating",
    3,
    [],  
    [new Cost("vital", "stamina", 1, false, true)], 
    [],
    [],
    undefined,
    {
        1: ['event', 'tired'],
        3: ['event', 'hatch1']
    })
const eatEggshell = new LimitAction(
    "Eat Eggshell",
    1,
    null,
    3,
    [],
    [],
    [new Yield("vital", "satiety", 4)],
    [new Yield("skill", "eating", 4)]
)

const limitActions = new Collection({
    breakEgg,
    eatEggshell,
})
    
const rest = new Action(
    "Rest", 
    5,
    "resting",
    [],
    [],
    [new Yield("vital", "stamina", 1)],
    [new Yield("skill", "resting", 1),
     new Yield("attribute", "metabolism", 1)
    ]
)
const digStones = new Action(
    "Dig Stones",
    0.5,
    "mining",
    [],
    [new Cost("vital", "stamina", 1, false, true)],
    [],
    [new Yield("resource", "stones", 1),
     new Yield("skill", 'mining', 1),
     new Yield("attribute", "strength", 1),
     new Yield("attribute", "constitution", 1),
    ],
    undefined,
    {
        1: ["event", "getStone"],
        50: ["event", "tooMuchStone"]
    }
)
const eatStone = new Action(
    "Eat Stone",
    1,
    "eating",
    [new Cost("resource", "stones", 1)],
    [],
    [new Yield("vital", "satiety", 1)],
    [new Yield("skill", "eating", 0.1),
     new Yield("attribute", "metabolism", 0.1)
    ]
)

const actions = new Collection({
    rest,
    digStones,
    eatStone,
})

const buildRockpile = new Building(
    "Build Rockpile",
    5,
    1.2,
    [["max", "inc", "resource", null, (n) => n * 0.1]],
    [new Cost("resource", "stones", 20)],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("attribute", "dexterity", 1)
    ]
)

const buildings = new Collection({
    buildRockpile
})

const actionManager = new ActionManager()

export { actions, actionManager, limitActions, buildings }