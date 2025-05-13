import { camelCase } from "../player.js"
import { tooltipText } from "../data/text.js"



/**
 * Abstract parent Class for all game components that interact dynamically with the modifier system
 *
 * @class Component
 * @typedef {Component}
 */
class Component {
    
    /**
     * Creates an instance of Component.
     *
     * @constructor
     * @param {String} name The name of the component, used in display and for generating the id
     * @param {String} type The type of the component, player[this.type + "s"][this.id] should always point to this object
     * @param {[[String, Number, Boolean, Array]]} [varDefs=[]] An array of arrays of all params for intializing variables.
     * Array of the form [varType, base, triggersUpdate, parentVar], mod is the type of mo
     * Every non-abstract decendant class should have a finite number of predefined variables.
     * @param {[[String, String, String, String | null, Function]]} [effectDefs=[]] An array
     */
    constructor(name, type, varDefs = []) {
        this.name = name
        this.type = type
        this.id = camelCase(name)
        this.vars = this.initializeVars(varDefs)
        this.effectDefs = []
        this.flavourText = tooltipText.getTooltip(this.type, this.id)
        this.effectText = tooltipText.getDescripion(this.type, this.id)
        this.player = null
    }
    get effectScaleFactor() {
        return 0
    }
    get tooltip() {
        return this.flavourText + "<br>[Placeholder Text]<br>" + this.effectText
    }
    initializeVars(varDefs) {
        return varDefs.reduce((vars, v) => ({...vars, [v[0]]: new Var(v[0], this.type, this.id, v[1], v[2], v[3])}), {})
    }
    initializeEffects(effectDefs) {
        return effectDefs.map((m) => new Effect(m[0], m[1], this.type, this.id, m[2], m[3], m[4]))
    }
    init(player) {
        this.player = player
        this.effects = this.initializeEffects(this.effectDefs)
        for (let v in this.vars) {
            this.vars[v].init(player)
        }
    }
    updateVar(mod) {
        if (this.vars[mod]) {
            this.vars[mod].update(this.player)
        }
    }
    updateEffects() {
        for (let m of this.effects) {
            m.update(this.player, this.effectScaleFactor)
        }
    }
    update() {
        this.updateEffects(this.player)
        for (let v in this.vars) {
            this.updateVar(v)
        }
    }
    save() {
        return
    }
    load(data) {
        for (let k in data) {
            this[k] = data[k]
        }
    }
}

class Var {
    constructor(varType, compType, compId, base, triggersUpdate = false, parentDefs = []) {
        this.varType = varType
        this.compType = compType
        this.compId = compId
        this.parentDefs = parentDefs
        this.parentVars = []
        this.childMods = []
        this.triggersUpdate = triggersUpdate
        this.base = base
        this.flat = 0
        this.inc = 0
        this.more = 1
        this.final = base
    }
    get effectMult() {
        return 1
    }
    get parentFlat() {
        return this.parentVars.reduce((t, o) => t + o.flat, 0)
    }
    get parentInc() {
        return this.parentVars.reduce((t, o) => t + o.inc, 0)
    }
    get parentMore() {
        return this.parentVars.reduce((t, o) => t * o.more, 1)
    }
    init(player) {
        for (let d of this.parentDefs) {
            if (d[1]) {
                this.parentVars.push(player.getComponent(d[0], d[1]).vars[d[2]])
                player.getComponent(d[0], d[1]).vars[d[2]].childMods.push(this)
            }

        }
        
    }
    update(player) {
        let mods = player.getMods(this.compType, this.compId, this.varType)
        this.flat = mods.flat + this.parentFlat
        this.inc = mods.inc + this.parentInc
        this.more = mods.more * this.parentMore
        this.final = (this.base + this.flat) * (1 + this.inc) * this.more
        for (let m of this.childMods) {
            m.update(player)
        }
        if (this.triggersUpdate) {
            player.getComponent(this.compType, this.compId).updateEffects(player)
        }
    }
}

class Effect {
    constructor(mod, modType, sourceType, sourceId, targetType, targetId = null, func) {
        this.mod = mod
        this.modType = modType
        this.sourceType = sourceType
        this.sourceId = sourceId
        this.targetType = targetType
        this.targetId = targetId
        if (typeof func == "number") {
            this.func = (n) => n * func
        } else {
            this.func = func
        }
    }
    update(player, scaleFactor) {
        if (this.targetId) {
            player.setMod(this.modType, [this.targetType, this.targetId, this.mod], [this.sourceType, this.sourceId], this.func(scaleFactor))
            return
        }
        player.setMod(this.modType, [this.targetType, this.mod], [this.sourceType, this.sourceId], this.func(scaleFactor))
    }
}

export { Component }