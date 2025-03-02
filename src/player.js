import { vitals } from "./data/vitals.js"
import { actionManager, actions } from "./data/actions.js";
import { events } from "./data/events.js";

const player = {
    events: events,
    vitals: vitals,
    actionManager: actionManager,
    resources: [],
    actions: actions,
    skills: [],
    attributes: [],
    spiritAttributes: [],
    effects: [],
    inventory: [],
    lastUpdate: 0,
}

function getComponent(player, type, id) {
    return player[type + "s"][id]
}

function returnCounters(counters) {
    let list = Object.values(counters)
    return list.filter((a) => a.visible)
}

export {player, getComponent, returnCounters}