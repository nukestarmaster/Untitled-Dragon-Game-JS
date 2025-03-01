import { Vital } from "../classes/vital.js"

const health = new Vital("Health", 4, 5, "w3-red", true)
const stamina = new Vital("Stamina", 5, 5, "w3-yellow", true)

const vitals = {health: health, 
                stamina: stamina}

export {vitals}