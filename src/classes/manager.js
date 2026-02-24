import { Component } from "./component.js"
import { Cost, Yield } from "./counter.js"

class ActionManager extends Component {
    constructor() {
        let actiomManagerVarDefs = [
            ["hungerRate", 0],
            ["growthRate", 0],
            ["upkeepRate", 1],
            ["healthRegen", 0],
            ["staminaRegen", 0],
            ["manaRegen", 0],
            ["limit", 1]
        ]
        super("Action Manager", "actionManager", actiomManagerVarDefs)
        
        this.hunger = new Cost("vital", "satiety", 1, false, true)
        this.growth = new Yield("baseStat", "growth", 1)
        this.healthRegen = new Yield("vital", "health", 1)
        this.stamianRegen = new Yield("vital", "stamina", 1)
        this.manaRegen = new Yield("vital", "mana", 1)
        this.upkeep = []
        this.actions = []
        this.starving = false
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
    get healthRegenRate() {
        return this.vars.healthRegen.final
    }
    get staminaRegenRate() {
        return this.vars.staminaRegen.final
    }
    get manaRegenRate() {
        return this.vars.manaRegen.final
    }
    get limit() {
        return Math.floor(this.vars.limit.final)
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

    get ticking() {
        return this.actions.length == this.limit
    }

    tick(dt) {
        this.hunger.spend(this.player, this.hungerRate * dt)
        this.growth.earn(this.player, this.growthRate * dt)
        this.healthRegen.earn(this.player, this.healthRegenRate * dt)
        this.stamianRegen.earn(this.player, this.staminaRegenRate * dt)
        this.manaRegen.earn(this.player, this.manaRegenRate * dt)
        this.upkeep.map((c) => c.spend(this.player, this.upkeepRate * dt))
        this.actions.map((a) => a.tick())
        if (this.player.getComponent("vital", "satiety").current == 0) {
            if (this.player.getComponent("limitAction", "eatEggshell").clickable()) {
                this.player.getComponent("limitAction", "eatEggshell").click()
                return
            }
            if (this.player.getComponent("action", "eatStone").clickable()) {
                this.player.getComponent("action", "eatStone").click()
                return
            }
            if (this.player.getComponent("action", "eatCrystal").clickable()) {
                this.player.getComponent("action", "eatCrystal").click()
                return
            }
            if (this.player.getComponent("action", "eatGold").clickable()) {
                this.player.getComponent("action", "eatGold").click()
                return
            }
            this.starving = true
            this.player.getComponent("vital", "health").remove(this.hunger.getCost(this.player, this.hungerRate * dt) * 2)
            if (this.player.getComponent("vital", "health").current < 0.01) {
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

class SpellManager extends Component {
    constructor() {
        super("Spell Manager", "spellManager", [])
        this.spells = []
    }
    activateSpell(spell) {
        this.spells.push(spell)
    }
    deactivateSpell(spell) {
        let list = this.spells.filter((s) => s.name != spell.name)
        this.spells = list
    }
    tick(dt) {
        this.spells.map((s) => s.tick())
    }
}

export { ActionManager, SpellManager }