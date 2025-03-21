class Collection {
    constructor(obj) {
        for (let k in obj) {
            this[k] = obj[k]
        }
    }
    init(player) {
        for (let c in this) {
            if (this[c].init) {
                this[c].init(player)
            }
        }
    }
}

export { Collection }