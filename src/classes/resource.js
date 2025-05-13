import { Counter } from "./counter.js";

class Resource extends Counter {
    constructor(name, initial, max) {
        super(name, "resource", initial, max, [], false, true)
    }
    get tooltip() {
        return this.flavourText + "<br>" + this.effectText
    }
    earn( n, flat = false) {
        super.earn(n, flat)
        if (this.visible == false && this.current >= 1) {
            this.show()
        }
    }
}

export { Resource }