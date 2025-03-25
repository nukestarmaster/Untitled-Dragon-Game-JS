import { Collection } from "../classes/collection.js"
import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent } from "../classes/event.js"

const nullEvent = new TextEvent("Null Event")
const start1 = new WaitEvent("Start 1", [["event", "start2", 1000]], "event1")
const start2 = new WaitEvent("Start 2", [["event", "start3", 1000]], "event2")
const start3 = new RevealEvent("Start 3", [["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")
const tired = new RevealEvent("Tired", [["action", "rest", 0]], "tired")
const hatch1 = new RevealEvent("Hatch 1", [["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 = new UpkeepEvent("Hatch 2", [["vital", "satiety", 0.5]])
const getStone = new RevealEvent("Get Stone", [["resource", "stones"], ["action", "eatStone"]], "Dug up a stone")
const tooMuchStone = new RevealEvent("Too Much Stone", [["building", "buildRockpile"]], "The cave is getting crounded with so much stone around, why not organize it into piles?")

const events = new Collection({
    nullEvent,
    start1,
    start2,
    start3,
    tired,
    hatch1,
    hatch2,
    getStone,
    tooMuchStone
})

export { events }