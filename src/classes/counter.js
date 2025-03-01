class CounterList {
    constructor(name, counters) {
        this.name = name
        this.counters = counters
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
        this.fullEffect = () => {return;}
        this.emptyEffect = () => {return;}
        this.capped = capped
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
    canEarn(capped) {
        return !capped || !this.capped || this.max > this.current
    }
    canSpend(n, flat = false, allowPartial = false) {
        return (this.allowDeficit || (n < 1 && this.amount > 0) || this.getCost(n, flat) < this.current)
    }
    earn(n, flat = false) {
        if (this.canEarn()) {
            this.add(this.getEarnings(n, flat))
        }
    }
    spend(n, flat = false, allowPartial = false) {
        if (this.canSpend(n, flat, allowPartial)) {
            this.remove(this.getCost(n, flat))
        }
    }
}

class Cost {
    constructor(type, id, amount, flat = false, allowPartial = false) {
        this.type = type
        this.id = id
        this.amount = amount
        this.flat = flat
        this.allowPartial = allowPartial
    }
    canSpend(player, dt = 1) {
        return player[this.type + "s"][this.id].canSpend(this.amount * dt, this.flat, this.allowPartial)
    }
    spend(player, dt = 1) {
        player[this.type + "s"][this.id].spend(this.amount * dt, this.flat, this.allowPartial)
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
        return player[this.type + "s"][this.id].canEarn(this.capped)
    }
    earn(player, dt = 1) {
        player[this.type + "s"][this.id].earn(this.amount * dt, this.flat,)
    }
}

export {CounterList, Counter, Cost, Yield}