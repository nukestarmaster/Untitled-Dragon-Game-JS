import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent } from "../classes/event.js"

const nullEvent = new TextEvent()
const start1 = new WaitEvent([["event", "start2", 1000]], "event1")
const start2 = new WaitEvent([["event", "start3", 1000]], "event2")
const start3 = new RevealEvent([["vital", "stamina", 0], ["action", "breakEgg", 0]], "event3")

const events = {
    nullEvent: nullEvent,
    start1: start1,
    start2: start2,
    start3: start3,}

export { events }