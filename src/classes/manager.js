import { Component } from "./component.js"
import { Cost, Yield } from "./counter.js"

class ActionManager extends Component {
    constructor() {
        let actiomManagerVarDefs = [
            ["hungerRate", 0],
            ["growthRate", 0],
            ["upkeepRate", 1]
        ]
        super("Action Manager", "actionManager", actiomManagerVarDefs)
        
        this.limit = 1
        this.hunger = new Cost("vital", "satiety", 1, false, true)
        this.growth = new Yield("baseStat", "growth", 1)
        this.upkeep = []
        this.actions = []
        this.starving = false
        this.t0 = 0
        this.dt = 0
    }
    get hungerRate() {
        return this.vars.hungerRate.final
    }
    get growthRate() {
        return this.vars.growthRate.final
    }
    get upkeepRate() {
        return this.vars.upkeepRate.final
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
        this.upkeep.push(new Cost(type, id, amount, false, true))
    }

    tick() {
        if (this.actions.length > 0) {
            let t1 = Date.now()
            this.dt = (t1 - this.t0) / 1000
            this.hunger.spend(this.player, this.hungerRate * this.dt)
            this.growth.earn(this.player, this.growthRate * this.dt)
            this.upkeep.map((c) => c.spend(this.player, this.upkeepRate * this.dt))
            this.actions.map((a) => a.tick())
            if (!this.upkeep.every((c) => c.canSpend(this.player, this.upkeepRate * this.dt))) {
                this.actions.map((a) => a.deactivate())
            }
            this.t0 = t1
            if (this.player.getComponent("vital", "satiety").current == 0) {
                if (this.player.getComponent("limitAction", "eatEggshell").clickable()) {
                    this.player.getComponent("limitAction", "eatEggshell").click()
                    return
                }
                if (this.player.getComponent("action", "eatStone").clickable()) {
                    this.player.getComponent("action", "eatStone").click()
                    return
                }
                this.starving = true
                this.player.getComponent("vital", "health").remove(this.hunger.getCost(this.player, this.hungerRate * this.dt) * 2)
                if (this.player.getComponent("vital", "health").current == 0) {
                    this.player.die()
                }
            } else {
                this.starving = false
            }
            if (this.player.getComponent("vital", "stamina").current == 0) {
                this.player.getComponent("action", "rest").click()
                return
            }
            if (this.player.getComponent("vital", "health").current == 0) {
                this.player.getComponent("action", "heal").click()
                return
            }
        }
    }
}

export { ActionManager}