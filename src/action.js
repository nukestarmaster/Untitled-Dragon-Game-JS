import { Cost, Counter, CounterList } from "./counter.js";
import { player } from "./player.js";
import { vitals } from "./vitals.js";

class ActionManager {
    constructor(upkeep, limit = 1) {
        this.limit = limit
        this.upkeep = upkeep
        this.actions = []
        this.dt = 0
    }
    activateAction(action) {
        this.actions.push(action)
        if (this.actions.length > this.limit) {
            this.actions.shift().deactivate()
        }
    }
    deactivateAction(action) {
        let list = this.actions.filter((a) => a.name != action.name)
        this.actions = list
    }
    tick(dt) {
        if (player.actionManager.actions.length > 0) {
            player.actionManager.upkeep.map((c) => c.spend(dt))
            player.actionManager.actions.map((a) => a.tick(dt))
        }
    }
}

class Action extends Counter {
    constructor(name, max, visible, limited = false, remaining = 1, initCost = [], progCost = [], progYield = [], progSpeed = 0, compYeild = []) {
        super(name, 0, max, visible)
        this.limited = limited
        this.remaining = remaining
        this.initCost = initCost
        this.progCost = progCost
        this.progYield = progYield
        this.progSpeed = progSpeed
        this.compYeild = compYeild
        this.started = false
        this.active = false
        this.count = 0
    }
    activate(manager) {
        manager.activateAction(this)
        this.active = true
    }
    deactivate(manager) {
        manager.deactivateAction(this)
        this.active = false
    }
    click(dt, manager) {
        console.log(this.active)
        if (this.active) {
            this.deactivate(manager)
            return
        }
        if (!this.clickable(dt)) {
            return
        }
        this.activate(manager)
    }
    init
    clickable(dt) {
        return true
        if (!this.started) {
            if (!this.initCost.every((c) => c.canSpend())) {
                return false
            }
        }
        if (!this.progCost.every((c) => c.canSpend(dt))) {
            return false
        }
        return true
    }
    tick(dt) {
        console.log(`Ticking ${this.name}`)
        this.progCost.map((c) => c.spend(dt)) 
        console.log(`Cost paid.`, this.progCost)
        this.progYield.map((y) => y.earn(dt))
        this.earn(this.progSpeed * dt)
        
    }
}

const breakEgg = new Action("Break Egg", 5, true, true, 5, [], [new Cost(vitals.stamina, 0.5, false, true)], [], 1)

const actions = new CounterList("Actions", [breakEgg])

export { ActionManager, actions }