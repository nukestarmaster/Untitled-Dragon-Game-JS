import { camelCase } from "../player.js"
import { LimitAction } from "./action.js"
import { Cost, Yield } from "./counter.js"

/*Event is an class for assorted one off effects.

*/
class Event {
    constructor(name, components, eventText = null, nextEvent = null) {
        this.name = name
        this.components = components
        this.eventText = eventText
        this.nextEvent = nextEvent
        this.id = camelCase(name)
        this.type = "event"
    }
    call(player) {
        player.eventTrigger = true
        if (this.eventText != null) {
            console.log(this.eventText)
        }
        this.loop(player);
        player.eventTrigger = false
        if (this.nextEvent != null) {
            let nextEvent = player.getComponent("event", this.nextEvent)
            nextEvent.call(player)
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
    constructor(name, eventText) {
        super(name, [], 0, eventText)
    }
}

class WaitEvent extends Event {
    func(player, compType, compId, magnitude) {
        let nextEvent = player.getComponent(compType, compId)
        let boundCall = nextEvent.call.bind(nextEvent, player)
        setTimeout(boundCall, magnitude)
    }
}

class CostEvent extends Event {
    func(player, compType, compId, magnitude) {
        let cost0 = new Cost(compType, compId, magnitude, false, true)
        cost0.spend(player)
    }
}

class YieldEvent extends Event {
    func(player, compType, compId, magnitude) {
        let yield0 = new Yield(compType, compId, magnitude, false, true)
        yield0.earn(player)
    }
}

class RevealEvent extends Event {
    func(player, compType, compId, magnitude = 0) {
        if (compType == "limitAction") {
            player.getComponent(compType, compId).limit += magnitude
        }
        player.getComponent(compType, compId).visible = true
    }
}

class HideEvent extends Event {
    func(player, compType, compId) {
        player.getComponent(compType, compId).visible = false
    }
}

class UpkeepEvent extends Event {
    func(player, compType, compId, magnitude) {
        player.actionManager.changeUpkeep(compType, compId, magnitude)
    }
}

class ModEvent extends Event {
    func(player, modType, comp, magnitude) {
        player.setMod(modType, comp, [this.type, this.id], magnitude)
    }
}

class LootEvent extends Event {
    func(player, compId, rolls) {
        for (let i = 0; i < rolls; i++) {
            player.getComponent("lootTable", compId).call(player)
        }
    }
}

export { Event, TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, ModEvent, LootEvent }