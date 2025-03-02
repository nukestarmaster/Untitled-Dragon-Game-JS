import { Cost, Counter} from "./counter.js";

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
    constructor(name, max, limited = false, remaining = 1, initCost = [], progCost = [], progYield = [], progSpeed = 0, compYield = []) {
        super(name, 0, max, false, false)
        this.limited = limited
        this.remaining = remaining
        this.initCost = initCost
        this.progCost = progCost
        this.progYield = progYield
        this.progSpeed = progSpeed
        this.compYield = compYield
        this.started = false
        this.active = false
        this.count = 0
        this.capped = false
    }
    activate(player) {
        console.log(`Activating ${this.name}`)
        player.actionManager.activateAction(player, this)
        this.active = true
    }
    deactivate(player) {
        console.log(`Deactivating ${this.name}`)
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
    clickable(player, dt) {
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
        this.compYield.map((y) => y.earn(player))
        if (this.limited) {
            this.remaining --
            if (this.remaining <= 0) {
                this.visible = false
            }
        }
        if (this.clickable) {
            this.start(player)
        }
    }
}

export { ActionManager, Action }