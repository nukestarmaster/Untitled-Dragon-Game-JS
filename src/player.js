import { vitals } from "./data/vitals.js"
import { actionManager, actions, buildings, limitActions } from "./data/actions.js";
import { events, lootTables } from "./data/events.js";
import { resources } from "./data/resources.js";
import { skills, attributes } from "./data/stats.js";
import { Modifiers } from "./classes/modifier.js";
import { tooltipText } from "./data/text.js";

const player = {
    actionManager,
    vitals,
    actions,
    limitActions,
    buildings,
    resources,
    skills,
    attributes,
    spiritAttributes: [],
    modifiers: new Modifiers,
    effects: [],
    inventory: [],
    events,
    lootTables,
    tooltipText,
    getComponent(type, id) {
        return this[type + "s"][id]
    },
    setMod(modType, target, origin, magnitude) {
        this.modifiers.setMod(modType, target, origin, magnitude)
        if (target[2]) {
            this.getComponent(target[0], target[1]).updateVar(this, target[2])
            return
        }
        for (let c in this[target[0] + "s"]) {
            if (this.getComponent(target[0], c).updateVar) {
                this.getComponent(target[0], c).updateVar(this, target[1])
            }
            
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