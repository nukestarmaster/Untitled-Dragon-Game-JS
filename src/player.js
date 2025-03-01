import { vitals } from "./data/vitals.js"
import { actionManager, actions } from "./data/actions.js";

const player = {
    vitals: vitals,
    actionManager: actionManager,
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