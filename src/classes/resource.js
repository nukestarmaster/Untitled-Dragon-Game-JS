import { Counter } from "./counter.js";

class Resource extends Counter {
    constructor(name, initial, max) {
        super(name, initial, max, false, true)
        this.type = "resource"
    }
}

export { Resource }