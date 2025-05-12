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

    tick(player) {
        if (this.actions.length > 0) {
            let t1 = Date.now()
            this.dt = (t1 - this.t0) / 1000
            this.hunger.spend(player, this.hungerRate * this.dt)
            this.growth.earn(player, this.growthRate * this.dt)
            this.upkeep.map((c) => c.spend(player, this.upkeepRate * this.dt))
            this.actions.map((a) => a.tick(player))
            if (!this.hunger.canSpend(player, this.hungerRate * this.dt)) {
                this.actions.map((a) => a.deactivate(player))
            }
            if (!this.upkeep.every((c) => c.canSpend(player, this.upkeepRate * this.dt))) {
                this.actions.map((a) => a.deactivate(player))
            }
            this.t0 = t1
            if (player.getComponent("vital", "satiety").current == 0) {
                if (player.getComponent("limitAction", "eatEggshell").limit > 0) {
                    player.getComponent("limitAction", "eatEggshell").click(player)
                    return
                }
                if (player.getComponent("action", "eatStone").clickable(player)) {
                    player.getComponent("action", "eatStone").click(player)
                    return
                }
                player.die()
            }
            if (player.getComponent("vital", "stamina").current == 0) {
                player.getComponent("action", "rest").click(player)
                return
            }
            if (player.getComponent("vital", "health").current == 0) {
                player.getComponent("action", "heal").click(player)
                return
            }
        }
    }
}

export { ActionManager}