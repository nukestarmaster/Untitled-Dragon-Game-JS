import { ActionManager, actions } from "./action.js";
import { Cost } from "./counter.js"
import { vitals } from "./vitals.js"

const player = {
    vitals: vitals,
    actionManager: new ActionManager([]),
    resources: [],
    actions: actions,
    skills: [],
    attributes: [],
    spiritAttributes: [],
    effects: [],
    inventory: [],
    lastUpdate: 0
}

export {player}