import { Yield, Cost } from "../classes/counter.js"
import { Action, Building, LimitAction } from "../classes/action.js"
import { ActionManager } from "../classes/manager.js"
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
   
const heal = new Action(
    "Heal",
    3,
    "healing",
    [],
    [
        new Cost("vital", "stamina", 1),
        new Cost("vital", "satiety", 0.5)
    ],
    [new Yield("vital", "health", 0.1)],
    [
        new Yield("skill", "healing", 3),
        new Yield("attribute", "adaptability", 4),
        new Yield("attribute", "metabolism", 2),
        new Yield("attribute", "constitution", 1),
        new Yield("attribute", "intelligence", 1)
    ]
)
const eatStone = new Action(
    "Eat Stone",
    1,
    "eating",
    [new Cost("resource", "stones", 1)],
    [],
    [new Yield("vital", "satiety", 1)],
    [
        new Yield("skill", "eating", 0.2),
        new Yield("attribute", "metabolism", 0.2)
    ]
)
const eatGold = new Action(
    "Eat Gold",
    1,
    "eating",
    [new Cost("resource", "gold", 1)],
    [],
    [new Yield("vital", "satiety", 1.5)],
    [
        new Yield("skill", "eating", 1),
        new Yield("attribute", "metabolism", 2),
        new Yield("attribute", "adaptability", 0.5),
        new Yield("attribute", "power", 0.1)
    ]
)
const eatCrystal = new Action(
    "Eat Crystal",
    1,
    "eating",
    [new Cost("resource", "crystal", 1)],
    [],
    [
        new Yield("vital", "satiety", 1.2),
        new Yield("vital", "mana", 1)
    ],
    [
        new Yield("skill", "eating", 1),
        new Yield("skill", "manaManipulation", 2),
        new Yield("attribute", "metabolism", 2),
        new Yield("attribute", "adaptability", 1),
        new Yield("attribute", "power", 0.5)
    ]
)
const rest = new Action(
    "Rest", 
    5,
    "resting",
    [],
    [],
    [new Yield("vital", "stamina", 1)],
    [new Yield("skill", "resting", 2),
     new Yield("attribute", "metabolism", 2)
    ]
)
const meditate = new Action(
    "Meditate",
    3,
    "manaManipulation",
    [],
    [
        new Cost("vital", "stamina", 1)
    ],
    [
        new Yield("vital", "mana", 0.2, false, false),
       
    ],
    [
        new Yield("skill", "manaManipulation", 3),
        new Yield("attribute", "will", 2),
        new Yield("attribute", "intelligence", 1),
        new Yield("attribute", "perception", 1),
        new Yield("attribute", "adaptability", 0.5)
    ]
)

const digStones = new Action(
    "Dig Stones",
    0.5,
    "mining",
    [],
    [new Cost("vital", "stamina", 1)],
    [],
    [
        new Yield("resource", "stones", 1),
        new Yield("skill", 'mining', 1),
        new Yield("attribute", "strength", 1),
        new Yield("attribute", "constitution", 1),
        new Yield("attribute", "dexterity", 0.05),
        new Yield("attribute", "luck", 0.01)
    ],
    ["lootTable", "digStonesLT"],
    {
        1: ["event", "getStone"],
        5: ["event", "foundGold"],
        10: ["event", "foundGold"],
        25: ["event", "foundGold"],
        50: ["event", "tooMuchStone"],
        75: ["event", "foundCrystal"],
        100: ["event", "findCaves"]
    },
    [["max", "flat", "resource", "stones", 0.1]]
)
const crushStones = new Action(
    "Crush Stones",
    3,
    "manufacture",
    [new Cost("resource", "stones", 5)],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("resource", "sand", 1),
        new Yield("skill", "manufacture", 2),
        new Yield("attribute", "strength", 1)
    ]
)

const exploreCaves = new Action(
    "Explore Caves",
    3,
    "exploration",
    [],
    [
        new Cost("vital", "stamina", 1.5),
        new Cost("vital", "health", 0.1)
    ],
    [
        new Yield("skill", "exploration", 1),
        new Yield("attribute", "perception", 1),
        new Yield("attribute", "agility", 0.5),
        new Yield("attribute", "constitution", 0.5),
        new Yield("attribute", "luck", 0.2)
    ],
    [],
    ["lootTable", "exploreCavesLT"],
    {
        1: ["event", "injured"],
        5: ["event", "foundAdventurer"],
        10: ["event", "foundAdventurer"],
        15: ["event", "foundAdventurer"],
        25: ["event", "foundMage"]
    }
)

const organizeStorage = new Action(
    "Organize Storage",
    3,
    "organization",
    [],
    [
        new Cost("vital", "stamina", 0.5)
    ],
    [],
    [
        new Yield("skill", "organization", 2),
        new Yield("attribute", "intelligence", 0.5),
        new Yield("attribute", "perception", 0.5),
        new Yield("attribute", "dexterity", 0.5)
    ],
    undefined,
    {},
    [["max", "inc", "resource", null, 0.05]]
)

const actions = new Collection({
    heal,
    eatStone,
    eatGold,
    eatCrystal,
    rest,
    meditate,

    digStones,
    crushStones,

    exploreCaves,

    organizeStorage,
}, "Actions")



const breakEgg = new LimitAction(
    "Break Egg", 
    1,
    null,
    3,
    [],  
    [new Cost("vital", "stamina", 1)], 
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
        new Yield("skill", "mining", 3),
        new Yield("attribute", "strength", 1),
        new Yield("attribute", "constitution", 1),
        new Yield("attribute", "dexterity", 0.5),
        new Yield("attribute", "luck", 0.5)
    ],
    ["lootTable", "mineGoldLT"],
)
const mineCrystal = new LimitAction(
    "Mine Crystal",
    2,
    "mining",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [],
    [
        new Yield("resource", "crystal", 1),
        new Yield("skill", "mining", 8),
        new Yield("skill", "manaManipulation", 2),
        new Yield("attribute", "strength", 2),
        new Yield("attribute", "constitution", 2),
        new Yield("attribute", "power", 0.1)
    ],
    ["lootTable", "mineCrystalLT"],
)

const lootDeadAdventurer  = new LimitAction(
    "Loot Dead Adventurer",
    3,
    "looting",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "looting", 2),
        new Yield("attribute", "luck", 2),
        new Yield("attribute", "perception", 1),
        new Yield("attribute", "dexterity", 1)
    ],
    [
        new Yield("resource", "gold", 4),
    ],
    ["lootTable", "adventurerLT"],
    {
        1: ["event", "foundRiddleBook"],
        2: ["event", "foundConstructionBook"]
    }
)
const lootDeadMage = new LimitAction(
    "Loot Dead Mage",
    3,
    "looting",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "looting", 2),
        new Yield("attribute", "luck", 2),
        new Yield("attribute", "perception", 1),
        new Yield("attribute", "dexterity", 1)
    ],
    [
        new Yield("resource", "gold", 4),
        new Yield("resource", "crystal", 1)
    ],
    ["lootTable", "mageLT"]
)

const readBookofRiddles = new LimitAction(
    "Read Book of Riddles",
    5,
    "studying",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "studying", 2),
        new Yield("attribute", "intelligence", 2),
        new Yield("attribute", "perception", 1)
    ],
    [new Yield("resource", "books", 1, true)],
)
const readConstructionBook = new LimitAction(
    "Read Construction Book",
    5,
    "studying",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "studying", 1),
        new Yield("skill", "construction", 2),
        new Yield("attribute", "intelligence", 2),
    ],
    [new Yield("resource", "books", 1, true)],
    undefined,
    {
        1: ["event", "readCon1"],
        2: ["event", "readCon2"],
        3: ["event", "readCon3"]
    }
)
const readMagicBook = new LimitAction(
    "Read Magic Book",
    8,
    "studying",
    0,
    [],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "studying", 1),
        new Yield("skill", "spellcraft", 2),
        new Yield("skill", "manaManipulation", 1),
        new Yield("attribute", "intelligence", 2),
        new Yield("attribute", "will", 0.5)
    ],
    [new Yield("resource", "books", 1, true)],
    undefined,
    {
        1: ["event", "readMagic1"],
        2: ["event", "readMagic2"],
        3: ["event", "readMagic3"],
        4: ["event", "readMagic4"],
        5: ["event", "readMagic5"]
    }
)

const limitActions = new Collection({
    breakEgg,
    eatEggshell,

    mineGold,
    mineCrystal,

    lootDeadAdventurer,
    lootDeadMage,

    readBookofRiddles,
    readConstructionBook,
    readMagicBook
}, "Limit Actions")



const buildRockpile = new Building(
    "Build Rockpile",
    5,
    1.2,
    [
        ["max", "inc", "resource", null, (n) => 1 + 0.1 * n]
    ],
    [new Cost("resource", "stones", 20)],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("skill", "organization", 1),
        new Yield("attribute", "dexterity", 1)
    ]
)
const buildTable = new Building(
    "Build Table",
    4,
    2,
    [
        ["skillSpeed", "more", "skill", "eating", (n) => 1 + 0.05 * n],
        ["skillEff", "more", "skill", "eating", (n) => 1 + 0.05 * n],
        ["skillYield", "more", "skill", "eating", (n) => 1 + 0.05 * n]
    ],
    [
        new Cost("resource", "stones", 20),
        new Cost("resource", "gold", 4)
    ],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 2),
        new Yield("attribute", "dexterity", 1)
    ]
)
const buildBed = new Building(
    "Build Bed",
    4,
    2,
    [
        ["skillSpeed", "more", "skill", "resting", (n) => 1 + 0.05 * n],
        ["skillEff", "more", "skill", "resting", (n) => 1 + 0.05 * n],
        ["skillYield", "more", "skill", "resting", (n) => 1 + 0.05 * n]
    ],
    [
        new Cost("resource", "sand", 10),
        new Cost("resource", "gold", 4)
    ],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 2),
        new Yield("attribute", "dexterity", 1)
    ]
)
const buildStorage = new Building(
    "Build Storage",
    5,
    2,
    [
        ["max", "more", "resource", null, (n) => 1 + 0.1 * n],
        ["eff", "more", "resource", null, (n) => 1 + 0.05 * n]
    ],
    [
        new Cost("resource", "stones", 20),
        new Cost("resource", "sand", 10)
    ],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("skill", "organization", 1),
        new Yield("attribute", "dexterity", 1)
    ],
    [],
    {
        1: ["event", "builtStorage"]
    }
)
const buildHoard = new Building(
    "Build Hoard",
    5,
    2,
    [
        ["max", "more", "resource", "gold", (n) => 1 + n],
        ["level", "flat", "attribute", null, (n) => n]
    ],
    [new Cost("resource", "gold", 8)],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("skill", "organization", 1),
        new Yield("attribute", "dexterity", 1)
    ]
)
const buildLibrary = new Building(
    "Build Library",
    5,
    2,
    [
        ["max", "more", "resource", "books", (n) => 1 + n],
        ["yield", "more", "skill", null, (n) => 1 + 0.1 * n]
    ],
    [
        new Cost("resource", "books", 10),
        new Cost("resource", "stones", 20)
    ],
    [new Cost("vital", "stamina", 1)],
    [
        new Yield("skill", "construction", 1),
        new Yield("skill", "organization", 1),
        new Yield("attribute", "dexterity", 1),
        new Yield("attribute", "intelligence", 1)
    ]
)
const buildPylon = new Building(
    "Build Pylon",
    5,
    2,
    [
        ["spellEff", "more", "spell", null, 0.05],
        ["spellPower", "more", "spell", null, 0.05],
        ["spellRes", "more", "spell", null, 0.05],
        ["manaRegen", "flat", "actionManager", "actionManager", 0.01]
    ],
    [
        new Cost("resource", "crystal", 4),
        new Cost("resource", "gold", 4),
        new Cost("resource", "stones", 20)
    ],
    [
        new Cost("vital", "stamina", 1),
        new Cost("vital", "mana", 0.1)
    ],
    [
        new Yield("skill", "construction", 2),
        new Yield("skill", "manaManipulation", 1),
        new Yield("attribute", "dexterity", 1),
        new Yield("attribute", "intelligence", 1),
        new Yield("attribute", "will", 1),
        new Yield("attribute", "power", 0.2)
    ]
)

const buildings = new Collection({
    buildRockpile,

    buildTable,
    buildBed,
    buildStorage,

    buildHoard,
    buildLibrary,
    buildPylon
}, "Buildings")

const actionManager = new ActionManager()

export { actions, actionManager, limitActions, buildings }