import { Yield } from "../classes/counter.js"
import { Action, ActionManager } from "../classes/action.js"
import { CounterList, Cost } from "../classes/counter.js"
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
    true, 
    3, 
    [],  
    [new Cost("vital", "stamina", 1, false, true)], 
    [], 
    1)
const rest = new Action(
    "Rest", 
    1,
    true,
    false,
    1,
    [],
    [],
    [new Yield("vital", "stamina", 1)],
    0.01)

const actions = new CounterList("Actions", [breakEgg, rest])

const actionManager = new ActionManager([])

export { actions, actionManager }