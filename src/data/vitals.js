import { Collection } from "../classes/collection.js"
import { Vital } from "../classes/vital.js"

const health = new Vital("Health", 5, 5, "w3-red")
const stamina = new Vital("Stamina", 5, 5, "w3-yellow")
const satiety = new Vital("Satiety", 5, 5, "w3-orange")

const vitals = new Collection({
    health, 
    stamina,
    satiety
}, "Vitals")

export {vitals}