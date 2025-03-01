import { Cost, Counter, CounterList } from "./counter.js";
import { player } from "./player.js";
import { vitals } from "./vitals.js";

class ActionManager {
    constructor(upkeep, limit = 1) {
        this.limit = limit
        this.upkeep = upkeep
        this.actions = []
        this.t0 = 0
        this.dt = 0
    }
    activateAction(action) {
        this.actions.push(action)
        if (this.actions.length > this.limit) {
            this.actions.shift().deactivate(this)
        }
    }
    deactivateAction(action) {
        let list = this.actions.filter((a) => a.name != action.name)
        this.actions = list
    }
    tick() {
        if (player.actionManager.actions.length > 0) {
            let t1 = Date.now()
            this.dt = (t1 - this.t0) / 1000
            player.actionManager.upkeep.map((c) => c.spend(this.dt))
            player.actionManager.actions.map((a) => a.tick(this))
            this.t0 = t1
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
        console.log(manager)
        manager.deactivateAction(this)
        this.active = false
    }
    click(manager) {
        if (this.active) {
            console.log(manager)
            this.deactivate(manager)
            return
        }
        if (!this.clickable(manager.dt)) {
            return
        }
        manager.t0 = Date.now()
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
    tick(manager) {
        console.log(`Ticking ${this.name}`)
        console.log(this.progCost[0])
        console.log(`Costs ${this.progCost[0].counter.name}; amount remaining ${this.progCost[0].counter.current}`)
        console.log(this.progCost[0].canSpend(manager.dt))
        if (this.progCost.every((c) => c.canSpend(manager.dt))) {
            console.log("hi")
            this.progCost.map((c) => c.spend(manager.dt)) 
            this.progYield.map((y) => y.earn(manager.dt))
            this.earn(this.progSpeed * manager.dt)
        }
        else {
            console.log("ho")
            this.deactivate(manager)
        }
    }
}

const breakEgg = new Action("Break Egg", 5, true, true, 5, [],  [new Cost(vitals.stamina, 1, false, true)], [], 1)

const actions = new CounterList("Actions", [breakEgg])

export { ActionManager, actions }