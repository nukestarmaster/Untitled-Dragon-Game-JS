import { vitals } from "./data/vitals.js"
import { actionManager, actions, buildings, limitActions } from "./data/actions.js";
import { events } from "./data/events.js";
import { resources } from "./data/resources.js";
import { skills, attributes } from "./data/stats.js";
import { Modifiers } from "./classes/modifier.js";

const player = {
    actionManager: actionManager,
    vitals: vitals,
    actions: actions,
    limitActions: limitActions,
    buildings: buildings,
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
        console.log(target, modType, origin, magnitude)
        this.modifiers.setMod(modType, target, origin, magnitude)
        console.log(this.modifiers)
        if (target[2]) {
            this.getComponent(target[0], target[1]).updateVar(this, target[2])
            return
        }
        for (let c in this[target[0] + "s"]) {
            this.getComponent(target[0], c).updateVar(this, target[1])
        }
    },
    getMods(compType, compId, compMod) {
        return this.modifiers.getMods(compType, compId, compMod)
    },
    getModsNoFlat(compType, compId, compMod) {
        return this.modifiers.getModsNoFlat(compType, compId, compMod)
    },
    init() {
        for (let o in this) {
            if (this[o].init) {
                this[o].init(this)
            }
        }
    }
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