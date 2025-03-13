import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent } from "../classes/event.js"

const nullEvent = new TextEvent()
const start1 = new WaitEvent([["event", "start2", 1000]], "event1")
const start2 = new WaitEvent([["event", "start3", 1000]], "event2")
const start3 = new RevealEvent([["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")
const tired = new RevealEvent([["action", "rest", 0]], "tired")
const hatch1 = new RevealEvent([["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 = new UpkeepEvent([["vital", "satiety", 0.5]])
const getStone = new RevealEvent([["resource", "stones"], ["action", "eatStone"]], "Dug up a stone")

const events = {
    nullEvent,
    start1,
    start2,
    start3,
    tired,
    hatch1,
    hatch2,
    getStone,
}

export { events }