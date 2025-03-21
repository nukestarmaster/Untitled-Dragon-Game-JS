import { Counter } from "./counter.js";

class Vital extends Counter {
    constructor(name, initial, max, colour) {
        super(name, "vital", initial, max);
        this.colour = colour;
    }
}

export {Vital}