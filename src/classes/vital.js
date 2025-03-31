import { Counter } from "./counter.js";
import { format } from "../format.js";

class Vital extends Counter {
    constructor(name, initial, max, colour) {
        super(name, "vital", initial, max);
        this.colour = colour;
    }
    get tooltip() {
        return this.flavourText + "<br>" + this.effectText
    }
    display() {
        return `${this.name}: ${format(this.current, 1)} / ${format(this.max, 1)}`
    }
}

export {Vital}