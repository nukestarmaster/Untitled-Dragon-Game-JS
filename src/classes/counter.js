import { getComponent } from "../player.js";

/*Abstract class for everything that tracks a spendable and/or gainable resource, parent of nearly all visible elements.
Name is the formal name of the counter used for displaying text.
Initial is the initial number in the counter.
Max is the maximum number in the counter, different kinds of counters might do different things when reaching their maximum.
Visible is true when the counter is being displayed.
AllowDefecit true if the counter can go below 0.
Capped is true if the counter can go over max.
Type is a string that holds what implementation of Counter the counter is.
*/
class Counter {
    constructor(name, initial, max, allowDeficit = false, capped = true) {
        this.name = name
        this.current = initial
        this.max = max
        this.visible = false
        this.allowDeficit = allowDeficit
        this.capped = capped
        this.type = null
    }
    show() {
        this.visible = true
    }
    hide() {
        this.visible = false
    }
    yieldMod() {
        return 1
    }
    efficiency() {
        return 1
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
        return n * this.yieldMod()
    }
    getCost(n, flat) {
        if (flat) {
            return n
        }
        return n / this.efficiency()
    }
    canEarn(capped) {
        return !capped || !this.capped || this.max > this.current
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.allowDeficit || (allowPartial && this.current > 0) || this.getCost(n, flat) < this.current
    }
    earn(n, flat = false) {
        if (this.canEarn()) {
            this.add(this.getYield(n, flat))
        }
    }
    spend(n, flat = false, allowPartial = false) {
        if (this.canSpend(n, flat, allowPartial)) {
            this.remove(this.getCost(n, flat))
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
    canSpend(player, dt = 1) {
        return getComponent(player, this.type, this.id).canSpend(this.amount * dt, this.flat, this.allowPartial)
    }
    spend(player, dt = 1) {
        getComponent(player, this.type, this.id).spend(this.amount * dt, this.flat, this.allowPartial)
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
    canEarn(player, dt = 1) {
        return !this.capped || getComponent(player, this.type, this.id).canEarn(this.capped)
    }
    earn(player, dt = 1) {
        getComponent(player, this.type, this.id).earn(this.amount * dt, this.flat,)
    }
}

export { Counter, Cost, Yield }