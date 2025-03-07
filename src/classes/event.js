import { Cost, Yield } from "./counter.js"
import { getComponent, returnCounters } from "../player.js"

/*Event is an class for assorted one off effects.

*/
class Event {
    constructor(components, eventText = null, nextEvent = null) {
        this.components = components
        this.eventText = eventText
        this.nextEvent = nextEvent
    }
    call(player) {
        player.eventTrigger = true
        if (this.eventText != null) {
            console.log(this.eventText)
        }
        this.loop(player);
        player.eventTrigger = false
        if (this.nextEvent != null) {
            this.nextEvent.call(player)
        }
    }
    loop(player) {
        for (let i of this.components) {
            this.func(player, i[0], i[1], i[2])
        }
    }
    func(player, compId, compType) {
        return 
    }
}

class TextEvent extends Event {
    constructor(eventText) {
        super([], 0, eventText)
    }
}

class WaitEvent extends Event {
    constructor(components, eventText) {
        super(components, eventText)
    }
    func(player, compType, compId, magnitude) {
        let nextEvent = getComponent(player, compType, compId)
        let boundCall = nextEvent.call.bind(nextEvent, player)
        setTimeout(boundCall, magnitude)
    }
}

class CostEvent extends Event {
    constructor(components, eventText) {
        super(components, eventText)
    }
    func(player, compType, compId, magnitude) {
        let cost0 = new Cost(compType, compId, magnitude, false, true)
        cost0.spend(player)
    }
}

class YieldEvent extends Event {
    constructor(components, eventText) {
        super(components, eventText)
    }
    func(player, compType, compId, magnitude) {
        let yield0 = new Yield(compType, compId, magnitude, false, true)
        yield0.earn(player)
    }
}

class RevealEvent extends Event {
    constructor(components, eventText) {
        super(components, eventText)
    }
    func(player, compType, compId, magnitude) {
        getComponent(player, compType, compId).visible = true
    }
}

class HideEvent extends Event {
    constructor(components, magnitude, eventText) {
        super(components, magnitude, eventText)
    }
    func(player, compType, compId, magnitude) {
        getComponent(player, compType, compId).visible = false
    }
}

Event.working

export { Event, TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent }