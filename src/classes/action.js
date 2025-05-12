
import { format } from "../format.js";
import { Counter } from "./counter.js";

class Action extends Counter {
    constructor(name, max, skill = null, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}, effectDefs = [], varDefs = [], type = "action") {
        let actionVarDefs = [
            ["speed", 1, false, [["skill", skill, "skillSpeed"]]],
            ["eff", 1, false, [["skill", skill, "skillEff"]]],
            ["yield", 1, false, [["skill", skill, "skillYield"]]]].concat(varDefs)
        super(name, type, 0, max, actionVarDefs , false, false)
        this.skill = skill
        this.initCost = initCost
        this.progCost = progCost
        this.progYield = progYield
        this.compYield = compYield
        this.compEvent = compEvent
        this.countEvents = countEvents
        this.effectDefs = effectDefs
        this.started = false
        this.active = false
        this.count = 0
        this.capped = false
    }

    getYield(n) {
        return n
    }
    getCost(n) {
        return n
    }
    get effectScaleFactor() {
        return this.count
    }
    get speedMod() {
        return this.vars.speed.final
    }
    get effMod() {
        return this.vars.eff.final
    }
    get yieldMod() {
        return this.vars.yield.final
    }
    get startCostMod() {
        return 1 / this.effMod
    }
    get progCostMod() {
        return this.speedMod / this.effMod
    }
    get progYieldMod() {
        return this.speedMod * this.yieldMod
    }
    activate(player) {
        player.actionManager.activateAction(player, this)
        this.active = true
    }
    deactivate(player) {
        player.actionManager.deactivateAction(this)
        this.active = false
    }
    click(player) {
        player.actionManager.t0 = Date.now()
        if (this.active) {
            this.deactivate(player)
            return
        }
        if (!this.clickable(player, player.actionManager.dt)) {
            return
        }
        if (!this.started) {
            this.start(player)
        }
        this.activate(player)
    }
    clickable(player) {
        let dt = player.actionManager.dt
        if (!this.visible) {
            return false
        }
        if (!this.started) {
            if (!this.startable(player)) {
                return false
            }
        }
        if (!this.progCost.every((c) => c.canSpend(player, dt * this.progCostMod, true))) {
            return false
        }
        if (!this.progYield.every((c) => c.canEarn(player, dt * this.progYieldMod))) {
            return false
        }
        if (!this.compYield.every((c) => c.canEarn(player, this.yieldMod))) {
            return false
        }
        return true
    }
    startable(player) {
        return this.initCost.every((c) => c.canSpend(player, this.startCostMod))
    }
    tick(player) {
        let dt = player.actionManager.dt
        if (this.clickable(player, dt)) {
            this.progCost.map((c) => c.spend(player, dt * this.progCostMod, true)) 
            this.progYield.map((y) => y.earn(player, dt * this.progYieldMod))
            this.earn(player, dt * this.speedMod)
        }
        if (!this.clickable(player, dt)) {
            this.deactivate(player)
        }
        while((this.current > this.max) && this.started) {
            this.complete(player)
        }
    }
    start(player) {
        this.initCost.map((c) => c.spend(player, 1 / this.effMod))
        this.started = true
    }
    complete(player) {
        this.started = false
        this.current -= this.max
        this.count ++
        this.updateEffects(player)
        if (this.compEvent) {
            player.getComponent(this.compEvent[0], this.compEvent[1]).call(player)
        }
        if (this.countEvents[this.count]) {
            player.getComponent(this.countEvents[this.count][0], this.countEvents[this.count][1]).call(player)
        }
        this.compYield.map((y) => y.earn(player, this.yieldMod))
        this.deactivate(player)
        if (this.clickable(player)) {
            this.start(player)
            this.activate(player)
        }
    }
    display() {
        return `<b>${this.name}</b><br>Completed: ${this.count}`
    }
    get tooltip() {
        let skillText
        if (this.skill) {
            skillText =  `<b>Related Skill:</b> ${this.skill}<br>`
        } else { skillText = ""}

        let durationText = `<b>Duration:</b> ${format(this.max / this.speedMod, 2)} s<br>`

        let initCostText
        if (this.initCost.length > 0) {
            initCostText = "<b>Start Cost:</b><br>" + this.initCost.reduce((str, c) => `${str} ${c.display(this.startCostMod)}<br>`, "")
        } else { initCostText = ""}

        let progCostText
        if (this.progCost.length > 0) {
            progCostText = "<b>Progress Cost</b>:<br>" + this.progCost.reduce((str, c) => `${str} ${c.display(this.progCostMod)}/s<br>`, "")
        } else { progCostText = ""}

        let progYieldText
        if (this.progYield.length > 0) {
            progYieldText = "<b>Progress Yield</b>:<br>" + this.progYield.reduce((str, c) => `${str} ${c.display(this.progYieldMod)}/s<br>`, "")
        } else { progYieldText = ""}

        let compYieldText
        if (this.compYield.length > 0) {
            compYieldText = "<b>Final Yield</b>:<br>" + this.compYield.reduce((str, c) => `${str} ${c.display(this.yieldMod)}<br>`, "")
        } else { compYieldText = ""}

        return `${this.flavourText}<br>${skillText}${durationText}${initCostText}${progCostText}${progYieldText}${compYieldText}${this.effectText}`
    }
    save() {
        return {
            visible: this.visible,
            current: this.current,
            started: this.started,
            count: this.count
        }
    }
}

class LimitAction extends Action {
    constructor(name, max, skill = null, limit = 1, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}, effectDefs = []) {
        super(name, max, skill, initCost, progCost, progYield, compYield, compEvent, countEvents, [], [], "limitAction")
        this.limit = limit
        this.effectDefs = effectDefs
    }
    complete(player) {
        this.limit --
        if (this.limit <= 0) {
            this.visible = false
        }
        super.complete(player)
    }
    display() {
        return `<b>${this.name}</b><br>Remaining: ${this.limit}`
    }
    save() {
        return {
            visible: this.visible,
            current: this.current,
            started: this.started,
            count: this.count,
            limit: this.limit,
        }
    }
}

class Building extends Action {
    constructor(name, max, mult, effectDefs, initCost, progCost, progYield, compYield, compEvent, countEvents, varDefs = []) {
        let buildVarDefs = [["cost", 1]].concat(varDefs)
        super(name, max, "construction", initCost, progCost, progYield, compYield, compEvent, countEvents, [], buildVarDefs, "building")
        this.effectDefs = [
            ["cost", "more", this.type, this.id, (n) => mult ** n]
        ].concat(effectDefs)
    }
    get costMod() {
        return this.vars.cost.final
    }
    get startCostMod() {
        return this.costMod / this.effMod
    }
    start(player) {
        this.initCost.map((c) => c.spend(player, this.startCostMod))
        this.started = true
    }
    startable(player) {
        return this.initCost.every((c) => c.canSpend(player, this.startCostMod))
    }
    complete(player) {
        this.started = false
        this.current -= this.max
        this.count ++
        this.updateEffects(player)
        if (this.compEvent) {
            player.getComponent(this.compEvent[0], this.compEvent[1]).call(player)
        }
        if (this.countEvents[this.count]) {
            player.getComponent(this.countEvents[this.count][0], this.countEvents[this.count][1]).call(player)
        }
        this.compYield.map((y) => y.earn(player, this.effMod))
        this.deactivate(player)
    }
    display() {
        return `<b>${this.name}</b><br>Built: ${this.count}<br>Cost: ${this.displayCost()}`
    }
    displayCost() {
        return this.initCost.reduce((s, c) => `${s}${format(c.amount * this.startCostMod)} ${c.id} `, "")
    }
}

export { Action, LimitAction, Building }