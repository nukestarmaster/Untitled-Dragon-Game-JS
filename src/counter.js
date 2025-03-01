class CounterList {
    constructor(name, actions) {
        this.name = name
        this.counters = actions
    }
    returnCounters() {
        return this.counters.filter((a) => a.visible)
    }
}

class Counter {
    constructor(name, initial, max, visible = false, allowDeficit = false, capped = true) {
        this.name = name
        this.current = initial;
        this.max = max;
        this.type = null;
        this.visible = visible
        this.allowDeficit = allowDeficit
        this.capped = capped
        this.fullEffect = () => {return;}
        this.emptyEffect = () => {return;}

    }
    gain() {
        return 1
    }
    efficiency() {
        return 1
    }
    add(n) {
        this.current += n;
        if (this.current >= this.max) {
            this.fullEffect(this.current - this.max);
            if (this.capped) {
                this.current = this.max;
            }
        }
    }
    remove(n) {
        this.current -= n;
        if (this.current <= 0) {
            this.emptyEffect(-this.current);
            if (!this.allowDeficit) {
                this.current = 0;
            }
        }
    }
    getEarnings(n, flat) {
        if (flat) {
            return n
        }
        return n * this.gain()
    }
    getCost(n, flat) {
        if (flat) {
            return n
        }
        return n / this.efficiency()
    }
    canEarn() {
        return !this.capped || this.max > this.current
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.allowDeficit || (allowPartial && this.amount > 0) || this.getCost(n, flat) < this.current
    }
    earn(n, flat = false) {
        if (this.canEarn()) {
            this.add(this.getEarnings(n, flat))
        }
    }
    spend(n, flat = false, allowPartial = false) {
        if (this.canSpend(n, flat, allowPartial)) {
            this.remove(this.getCost(n, flat))
            return false
        }
        return true
    }
}

class Cost {
    constructor(counter, amount, flat = false, allowPartial = false) {
        this.counter = counter
        this.amount = amount
        this.flat = flat

        this.allowPartial = allowPartial
    }
    canSpend(dt = 1) {

    }
    spend(dt = 1) {
        return this.counter.spend(this.amount * dt, this.flat, this.allowPartial)
    }
}

class Yield {
    constructor(counter, amount, flat = false,) {
        this.counter = counter
        this.amount = amount
        this.flat = flat
        this.capped = capped
    }
    earn(dt = 1) {
        this.counter.earn(this.amount * dt, this.flat,)
    }
}

export {CounterList, Counter, Cost, Yield}