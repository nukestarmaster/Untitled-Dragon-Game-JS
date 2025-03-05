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
}

function getComponent(player, type, id) {
    return player[type + "s"][id]
}

function returnCounters(counters) {
    let list = Object.values(counters)
    return list.filter((a) => a.visible)
}

function startEvent(player) {
    let event1 = getComponent(player, "event", "start1")
    let call = event1.call.bind(event1, player)
    call()
}

export {player, getComponent, returnCounters, startEvent}