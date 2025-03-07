import { getComponent } from "../player.js";
import { Cost, Counter} from "./counter.js";
import { format } from "../format.js";

class ActionManager {
    constructor(upkeep, limit = 1) {
        this.limit = limit
        this.upkeep = upkeep
        this.actions = []
        this.t0 = 0
        this.dt = 0
    }
    activateAction(player, action) {
        this.actions.push(action)
        if (this.actions.length > this.limit) {
            this.actions.shift().deactivate(player)
        }
    }
    deactivateAction(action) {
        let list = this.actions.filter((a) => a.name != action.name)
        this.actions = list
    }
    tick(player) {
        if (this.actions.length > 0) {
            let t1 = Date.now()
            this.dt = (t1 - this.t0) / 1000
            player.actionManager.upkeep.map((c) => c.spend(this.dt))
            player.actionManager.actions.map((a) => a.tick(player))
            this.t0 = t1
        }
    }
}

class Action extends Counter {
    constructor(name, max, progSpeed = 1, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}) {
        super(name, 0, max, false, false)
        this.initCost = initCost
        this.progCost = progCost
        this.progYield = progYield
        this.progSpeed = progSpeed
        this.compYield = compYield
        this.compEvent = compEvent
        this.countEvents = countEvents
        this.started = false
        this.active = false
        this.count = 0
        this.capped = false
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
    init
    clickable(player) {
        let dt = player.actionManager.dt
        if (!this.visible) {
            return false
        }
        if (!this.started) {
            if (!this.initCost.every((c) => c.canSpend(player))) {
                return false
            }
        }
        if (!this.progCost.every((c) => c.canSpend(player, dt))) {
            return false
        }
        if (!this.progYield.every((c) => c.canEarn(player, dt))) {
            return false
        }
        if (!this.compYield.every((c) => c.canEarn(player))) {
            return false
        }
        return true
    }
    tick(player) {
        let dt = player.actionManager.dt
        if (this.clickable(player, dt)) {
            this.progCost.map((c) => c.spend(player, dt)) 
            this.progYield.map((y) => y.earn(player, dt))
            this.earn(this.progSpeed * dt)
        }
        else {
            this.deactivate(player)
        }
        while(this.current > (this.max) && this.started) {
            this.complete(player)
        }
    }
    start(player) {
        this.initCost.map((c) => c.spend(player))
        this.started = true
    }
    complete(player) {
        this.started = false
        this.current -= this.max
        this.count ++
        if (this.compEvent) {
            getComponent(player, this.compEvent[0], this.compEvent[1]).call(player)
        }
        if (this.countEvents[this.count] != undefined) {
            getComponent(player, this.countEvents[this.count][0], this.countEvents[this.count][1]).call(player)
        }
        this.compYield.map((y) => y.earn(player))
        if (this.clickable) {
            this.start(player)
        }
    }
    display() {
        return `<b>${this.name}</b><br>Completed: ${this.count}`
    }
}

class LimitAction extends Action {
    constructor(name, max, progSpeed = 1, limit = 1, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}) {
        super(name, max, progSpeed, initCost, progCost, progYield, compYield, compEvent, countEvents)
        this.limit = limit
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
}

export { ActionManager, Action, LimitAction }