class Counter {
    constructor(name, initial, max) {
        this.name = name;
        this.current = initial;
        this.max = max;
        this.type = null;
    }
    gain() {
        return 1
    }
    efficiency() {
        return 1
    }
    fullEffect(n) {
        return
    }
    emptyEffect(n) {
        return
    }
    add(n) {
        this.amount += n;
        if (this.amount > this.max) {
            this.fullEffect(this.amount - this.max);
            this.amount = this.max;
        }
    }
    remove(n) {
        this.amount -= n;
        if (this.amount < 0) {
            this.emptyEffect(-this.amount);
            this.amount = 0;
        }
    }
    getEarnings(n) {
        return n * this.gain()
    }
    getCost(n) {
        return n / this.efficiency()
    }
    earn(n) {
        this.add(this.getEarnings(n))
    }
    spend(n) {
        this.remove(this.getCost(n))
    }
}

export {Counter}