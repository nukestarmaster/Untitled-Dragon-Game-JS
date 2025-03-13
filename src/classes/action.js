import { getComponent } from "../player.js";
import { Cost, Counter} from "./counter.js";

class ActionManager {
    constructor() {
        this.limit = 1
        this.upkeep = []
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
    changeUpkeep(type, id, amount) {
        for (let c in this.upkeep) {
            if (this.upkeep[c].type == type && this.upkeep[c].id == id) {
                this.upkeep[c].amount += amount
                if (this.upkeep[c].amount <= 0) {
                    this.upkeep.splice(c, 1)
                }
                return
            }
        }
        if (amount <= 0) {
            console.log(`Tried to remove upkeep of ${amount} from ${type}.${id} but this was not found in array`)
            console.log(this.upkeep)
            return
        }
        this.upkeep.push(new Cost(type, id, amount))
    }

    tick(player) {
        if (this.actions.length > 0) {
            let t1 = Date.now()
            this.dt = (t1 - this.t0) / 1000
            this.upkeep.map((c) => c.spend(player, this.dt))
            this.actions.map((a) => a.tick(player))
            if (!this.upkeep.every((c) => c.canSpend(player, this.dt))) {
                this.actions.map((a) => a.deactivate(player))
            }
            this.t0 = t1
        }
    }
}

class Action extends Counter {
    constructor(name, max, skill = null, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}) {
        super(name, 0, max, false, false)
        this.skill = skill
        this.initCost = initCost
        this.progCost = progCost
        this.progYield = progYield
        this.progSpeed = 1
        this.compYield = compYield
        this.compEvent = compEvent
        this.countEvents = countEvents
        this.started = false
        this.active = false
        this.count = 0
        this.capped = false
    }
    getSkillEff(player) {
        if (this.skill == null) {
            return 1
        }
        return 1 + (getComponent(player, "skill", this.skill).getLevel(player) * 0.01)
    }
    getSkillYield(player) {
        if (this.skill == null) {
            return 1
        }
        return 1 + (getComponent(player, "skill", this.skill).getLevel(player) * 0.01)
    }
    getSkillSpeed(player) {
        if (this.skill == null) {
            return 1
        }
        return 1 + (getComponent(player, "skill", this.skill).getLevel(player) * 0.05)
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
            if (!this.initCost.every((c) => c.canSpend(player, 1 / this.getSkillEff(player)))) {
                return false
            }
        }
        if (!this.progCost.every((c) => c.canSpend(player, dt * this.getSkillSpeed(player) / this.getSkillEff(player)))) {
            return false
        }
        if (!this.progYield.every((c) => c.canEarn(player, dt * this.getSkillSpeed(player) * this.getSkillYield(player)))) {
            return false
        }
        if (!this.compYield.every((c) => c.canEarn(player, this.getSkillYield(player)))) {
            return false
        }
        return true
    }
    tick(player) {
        let dt = player.actionManager.dt
        if (this.clickable(player, dt)) {
            this.progCost.map((c) => c.spend(player, dt * this.getSkillSpeed(player) / this.getSkillEff(player))) 
            this.progYield.map((y) => y.earn(player, dt * this.getSkillSpeed(player) * this.getSkillYield(player)))
            this.earn(this.progSpeed * dt * this.getSkillSpeed(player))
        }
        if (!this.clickable(player, dt)) {
            this.deactivate(player)
        }
        while(this.current > (this.max) && this.started) {
            this.complete(player)
        }
    }
    start(player) {
        this.initCost.map((c) => c.spend(player, 1 / this.getSkillEff(player)))
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
        this.compYield.map((y) => y.earn(player, this.getSkillEff(player)))
        if (this.clickable(player)) {
            this.start(player)
        }
    }
    display() {
        return `<b>${this.name}</b><br>Completed: ${this.count}`
    }
}

class LimitAction extends Action {
    constructor(name, max, skill = null, limit = 1, initCost = [], progCost = [], progYield = [], compYield = [], compEvent, countEvents = {}) {
        super(name, max, skill, initCost, progCost, progYield, compYield, compEvent, countEvents)
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