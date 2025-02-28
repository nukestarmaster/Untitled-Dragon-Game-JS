import { vitals } from "./vitals.js"

const player = {
    vitals: vitals,
    resources: [],
    actions: [],
    skills: [],
    attributes: [],
    spiritAttributes: [],
    effects: [],
    inventory: []
}

const breakEgg = {
    name: "Break Egg",
    progress: 0,
    max: 100,
    click() {
        console.log(this)
        this.progress++;
    }
}

player.actions.push(breakEgg)

export {player}