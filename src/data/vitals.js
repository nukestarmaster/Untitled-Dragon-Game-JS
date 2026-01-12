import { Collection } from "../classes/collection.js"
import { Vital } from "../classes/vital.js"

const health = new Vital("Health", 5, 5, "w3-red")
const satiety = new Vital("Satiety", 5, 5, "w3-orange")
const stamina = new Vital("Stamina", 5, 5, "w3-yellow")
const mana = new Vital("Mana", 0, 5, "w3-blue")

const vitals = new Collection({
    health, 
    satiety,
    stamina,
    mana
}, "Vitals")

export {vitals}