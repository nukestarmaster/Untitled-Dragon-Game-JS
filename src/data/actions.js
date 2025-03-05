import { Yield } from "../classes/counter.js"
import { Action, ActionManager } from "../classes/action.js"
import { Cost } from "../classes/counter.js"
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

const breakEgg = new Action(
    "Break Egg", 
    5, 
    true,
    3, 
    [],  
    [new Cost("vital", "stamina", 1, false, true)], 
    [], 
    1)

//breakEgg.visible = true
    
const rest = new Action(
    "Rest", 
    20,
    false,
    1,
    [],
    [],
    [new Yield("vital", "stamina", 1)],
    1)

const actions = 
    {breakEgg: breakEgg, 
    rest: rest}




const actionManager = new ActionManager([])

export { actions, actionManager }