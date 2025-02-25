import { vitals } from "./vitals.js"

var player = {
    vitals: vitals,
    resources: [],
    actions: [],
    skills: [],
    attributes: [],
    spiritAttributes: [],
    effects: [],
    inventory: []
}

var breakEgg = {
    name: "Break Egg",
    progress: 0,
    max: 100
}

player.actions.push(breakEgg)

export {player}