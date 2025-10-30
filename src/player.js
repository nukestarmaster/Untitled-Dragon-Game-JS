import { vitals } from "./data/vitals.js"
import { actionManager, actions, buildings, limitActions } from "./data/actions.js";
import { spellManager, spells } from "./data/spells.js";
import { events, lootTables } from "./data/events.js";
import { resources } from "./data/resources.js";
import { skills, attributes, spirits, baseStats } from "./data/stats.js";
import { Modifiers } from "./classes/modifier.js";
import { tooltipText } from "./data/text.js";

const player = {
    actionManager,
    spellManager,
    vitals,
    actions,
    limitActions,
    buildings,
    resources,
    spells,
    skills,
    attributes,
    spirits,
    baseStats,
    modifiers: new Modifiers,
    events,
    lootTables,
    tooltipText,
    getComponent(type, id) {
        return this[type + "s"]["data"][id]
    },
    setMod(modType, target, origin, magnitude) {
        this.modifiers.setMod(modType, target, origin, magnitude)
        if (target[0] == "actionManager") {
            this.actionManager.updateVar(target[2])
            return
        }
        if (target[2]) {
            this.getComponent(target[0], target[1]).updateVar(target[2])
            return
        }
        for (let c in this[target[0] + "s"].data) {
                this.getComponent(target[0], c).updateVar(target[1])          
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
    },
    toJSON() {
        let data = {}
        for (let k in this) {
            if (typeof this[k] != "object") {
                continue
            }
            if ("save" in this[k]) {
                let subData = this[k].save()
                if (subData && subData != {}) {
                    data[k] = subData
                }
            } else {
                console.log(`SubObject ${k} does not have save function`)
            }
        }
        console.log(data)
        return data
    },
    load(data) {
        console.log("Loading player\n")
        console.log(data)
        for (let k in data) {
            if (typeof this[k] != "object") {
                continue
            }
            if ("load" in this[k]) {
                this[k].load(data[k], this)
            } else {
                console.log(`Subobject ${k} does not have load function`)
            }
        }
    },
    update() {
        for (let k in this) {
            if (typeof this[k] != "object") {
                continue
            }
            if ("update" in this[k]) {
                this[k].update(this)
            } else {
                console.log(`Subobject ${k} does not have update function`)
            }
        }
    },
    die() {
        console.log("You have died!")
        this.app.reincarnate()
    },
    reincarnate() {
        let save = {
            spirits: this.spirits.save()
        }
        console.log(save)
        return save
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