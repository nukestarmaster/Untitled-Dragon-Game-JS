import { vitals } from "./data/vitals.js"
import { actionManager, actions, limitActions } from "./data/actions.js";
import { events } from "./data/events.js";
import { resources } from "./data/resources.js";
import { skills, attributes } from "./data/stats.js";
import { Modifiers } from "./classes/modifier.js";

const player = {
    actionManager: actionManager,
    vitals: vitals,
    actions: actions,
    limitActions: limitActions,
    resources: resources,
    skills: skills,
    attributes: attributes,
    spiritAttributes: [],
    modifiers: new Modifiers,
    effects: [],
    inventory: [],
    events: events,
    getComponent(type, id) {
        return this[type + "s"][id]
    },
    setMod(modType, target, origin, magnitude) {
        this.modifiers.setMod(modType, target, origin, magnitude)
    },
    getMods(compType, compId, compMod) {
        return this.modifiers.getMods(compType, compId, compMod)
    },
    getModsNoFlat(compType, compId, compMod) {
        return this.modifiers.getModsNoFlat(compType, compId, compMod)
    },
}

function camelCase(str) {
    return str.slice(0, 1).toLowerCase() + str.slice(1,).split(" ").join("")
}

function returnCounters(counters) {
    let list = Object.values(counters)
    return list.filter((a) => a.visible)
}

function startEvent(player) {
    let event1 = player.getComponent("event", "start1")
    let call = event1.call.bind(event1, player)
    call()
}

export { player, camelCase, returnCounters, startEvent }