import { Counter } from "./counter.js";

class Vital extends Counter {
    constructor(name, initial, max, colour) {
        super(name, initial, max);
        this.colour = colour;
        this.type = "vital";
    }
}

export {Vital}