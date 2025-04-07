import { Yield } from "../classes/counter.js"
import { Action, ActionManager, Building, LimitAction } from "../classes/action.js"
import { Cost } from "../classes/counter.js"
import { Collection } from "../classes/collection.js"
import { lootTables } from "./events.js"
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
     new Yield("skill", 'mining', 0.5),
     new Yield("attribute", "strength", 0.5),
     new Yield("attribute", "constitution", 0.5),
    ],
    ["lootTable", "digStonesLT"],
    {
        1: ["event", "getStone"],
        5: ["event", "foundGold"],
        50: ["event", "tooMuchStone"],
        100: ["event", "findCaves"]
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
const exploreCaves = new Action(
    "Explore Caves",
    5,
    "exploration",
    [],
    [new Cost("vital", "stamina", 2)],
    [
        new Yield("skill", "exploration", 1),
        new Yield("attribute", "perception", 0.5),
        new Yield("attribute", "agility", 0.2),
        new Yield("attribute", "constitution", 0.1)
    ],
    [],
    ["loottable", "exploreCavesLT"],
)

const actions = new Collection({
    rest,
    digStones,
    eatStone,
    exploreCaves
}, "Actions")



const breakEgg = new LimitAction(
    "Break Egg", 
    1,
    null,
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
    "eating",
    3,
    [],
    [],
    [new Yield("vital", "satiety", 4)],
    [new Yield("skill", "eating", 4)]
)
const mineGold = new LimitAction(
    "Mine Gold",
    1,
    "mining",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [],
    [
        new Yield("resource", "gold", 1),
        new Yield("skill", "mining", 5),
        new Yield("attribute", "dexterity", 2),
        new Yield("attribute", "luck", 1)
    ],
    ["lootTable", "mineGoldLT"],
    {
        1: ["event", "mineGold"]
    }
)

const limitActions = new Collection({
    breakEgg,
    eatEggshell,
    mineGold
}, "Limit Actions")



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
const buildHoard = new Building(
    "Build Hoard",
    5,
    2,
    [
        ["max", "more", "resource", "gold", (n) => 2 ** n],
        ["level", "flat", "attribute", null, (n) => n]
    ],
    [new Cost("resource", "gold", 10)],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("attribute", "dexterity", 1)
    ]
)

const buildings = new Collection({
    buildRockpile,
    buildHoard
}, "Buildings")

const actionManager = new ActionManager()

export { actions, actionManager, limitActions, buildings }