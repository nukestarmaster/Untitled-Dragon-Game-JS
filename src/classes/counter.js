import { format } from "../format.js";
import { Component } from "./component.js"

/*Abstract class for everything that tracks a spendable and/or gainable resource, parent of nearly all visible elements.
Name is the formal name of the counter used for displaying text.
Initial is the initial number in the counter.
Max is the maximum number in the counter, different kinds of counters might do different things when reaching their maximum.
Visible is true when the counter is being displayed.
AllowDefecit true if the counter can go below 0.
Capped is true if the counter can go over max.
Type is a string that holds what implementation of Counter the counter is.
*/
class Counter extends Component {
    constructor(name, type, initial, max, varDefs = [], allowDeficit = false, capped = true) {
        let counterVarDefs = [
            ["max", max],
            ["eff", 1],
            ["yield", 1]
        ].concat(varDefs)
        super(name, type, counterVarDefs)
        this.current = initial
        this.visible = false
        this.allowDeficit = allowDeficit
        this.capped = capped
    }
    get max() {
        return this.vars["max"].final
    }
    show() {
        this.visible = true
        this.player[this.type + "s"].visible = true
    }
    hide() {
        this.visible = false
    }
    add(n) {
        this.current += n;
        if (this.current >= this.max) {
            if (this.capped) {
                this.current = this.max;
            }
        }
    }
    remove(n) {
        this.current -= n;
        if (this.current <= 0) {
            if (!this.allowDeficit) {
                this.current = 0;
            }
        }
    }
    getYield(n, flat) {
        if (flat) {
            return n
        }
        return n * this.vars["yield"].final
    }
    getCost(n, flat) {
        if (flat) {
            return n
        }
        return n / this.vars["eff"].final
    }
    canEarn(capped) {
        return !capped || !this.capped || this.max > this.current
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.allowDeficit || (allowPartial && this.current > 0) || this.getCost(n, flat) <= this.current
    }
    earn(n, flat = false) {
        if (this.canEarn()) {
            this.add(this.getYield(n, flat))
        }
    }
    spend(n, flat = false, allowPartial = false) {
        if (this.canSpend(n, flat, allowPartial)) {
            this.remove(this.getCost(n, flat))
            return true
        }
        return false
    }
    display() {
        return `${this.name}: ${format(this.current)} / ${format(this.max)}`
    }
    save() {
        return {
            visible: this.visible,
            current: this.current
        }
    }
    load(data, player) {
        super.load(data)
        if (data.visible) {
            this.show(player)
        }
    }
}


/*Classes for spending from or gaining in a Counter.
Type and Id are the type and id of the counter respectively, combined they uniquely identify a counter.
Amount is the base amount spent or yielded to the counter.
Flat is true if the counter ignores efficiency/yieldMod modifiers.
allowPartial
*/
class Cost {
    constructor(type, id, amount, flat = false, allowPartial = false) {
        this.type = type
        this.id = id
        this.amount = amount
        this.flat = flat
        this.allowPartial = allowPartial
    }
    getCost(player, mult = 1) {
        return player.getComponent(this.type, this.id).getCost(mult * this.amount, this.flat)
    }
    canSpend(player, mult = 1, allowPartial) {
        return player.getComponent(this.type, this.id).canSpend(this.amount * mult, this.flat, this.allowPartial || allowPartial)
    }
    spend(player, mult = 1, allowPartial) {
        player.getComponent(this.type, this.id).spend(this.amount * mult, this.flat, this.allowPartial || allowPartial)
    }
    display(player, mult = 1) {
        return `${format(this.getCost(player, mult), 2)} ${this.id}`
    }
}

class Yield {
    constructor(type, id, amount, flat = false, capped = true) {
        this.type = type
        this.id = id
        this.amount = amount
        this.flat = flat
        this.capped = capped
    }
    getYield(player, mult) {
        return player.getComponent(this.type, this.id).getYield(mult * this.amount, this.flat)
    }
    canEarn(player, dt = 1) {
        return !this.capped || player.getComponent(this.type, this.id).canEarn(this.capped)
    }
    earn(player, dt = 1) {
        player.getComponent(this.type, this.id).earn(this.amount * dt, this.flat,)
    }
    display(player, mult = 1) {
        return `${format(this.getYield(player, mult), 2)} ${this.id}`
    }
}

export { Counter, Cost, Yield }