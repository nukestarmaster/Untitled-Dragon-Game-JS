import { Yield } from "../classes/counter.js"
import { Action, ActionManager, LimitAction } from "../classes/action.js"
import { Cost } from "../classes/counter.js"
import { getComponent } from "../player.js"
import { YieldEvent } from "../classes/event.js"
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
    null,
    3,
    [],
    [],
    [new Yield("vital", "satiety", 4)],
    [new Yield("skill", "eating", 4)]
)

const limitActions = {
    breakEgg,
    eatEggshell,
}
    
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
        1: ['event', 'getStone']
    }
)
const eatStone = new Action(
    "Eat Stone",
    1,
    null,
    [new Cost("resource", "stones", 1)],
    [],
    [new Yield("vital", "satiety", 1)],
    [new Yield("skill", "eating", 0.1),
     new Yield("attribute", "metabolism", 0.1)
    ]
)

const actions = {
    rest,
    digStones,
    eatStone,
}





const actionManager = new ActionManager()

export { actions, actionManager, limitActions }