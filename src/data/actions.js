import { Yield } from "../classes/counter.js"
import { Action, ActionManager, LimitAction } from "../classes/action.js"
import { Cost } from "../classes/counter.js"
import { getComponent } from "../player.js"
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
    5,
    1,
    3,
    [],  
    [new Cost("vital", "stamina", 1, false, true)], 
    [],
    [],
    undefined,
    {
        1: ['event', 'tired'],
        3: ['event', 'nullEvent']
    }
    )

//breakEgg.visible = true
    
const rest = new Action(
    "Rest", 
    20,
    1,
    [],
    [],
    [new Yield("vital", "stamina", 1)],
    )

const actions = 
    {breakEgg: breakEgg, 
    rest: rest}




const actionManager = new ActionManager([])

export { actions, actionManager }