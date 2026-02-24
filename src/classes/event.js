import { camelCase } from "../player.js"
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
    save() {
        return
    }
    update() {
        return
    }
}

class TextEvent extends Event {
    constructor(name, eventText, nextEvent) {
        super(name, [], eventText, nextEvent)
    }
    call(player) {
        window.alert(this.eventText)
        if (this.nextEvent != null) {
            let nextEvent = player.getComponent("event", this.nextEvent)
            nextEvent.call(player)
        }
    }
}

class WaitEvent extends Event {
    func(player, compType, compId, magnitude) {
        let nextEvent = player.getComponent(compType, compId)
        let boundCall = nextEvent.call.bind(nextEvent, player)
        setTimeout(boundCall, magnitude)
    }
}

class CallEvent extends Event {
    func(player, compType, compId) {
        player.getComponent(compType, compId).call(player)
    }
}

class AndEvent extends Event {
    constructor(name, flags, events, text, nextEvent) {
        super(name, flags, text, nextEvent)
        this.events = events
    }
    call(player) {
        player.eventTrigger = true
        if (this.eventText != null) {
            console.log(this.eventText)
        }
        this.fireEvents(player, this.loop(player))
        player.eventTrigger = false
        if (this.nextEvent != null) {
            let nextEvent = player.getComponent("event", this.nextEvent)
            nextEvent.call(player)
        }
    }
    loop(player) {
        let n = 1
        for (let i of this.components) {
            n *= this.func(player, i[0], i[1], i[2])
        }
        return n
    }
    func(player, flagType, flagId, threshold) {
        return player.getComponent(flagType, flagId).check(threshold)
    }
    fireEvents(player, val) {
        console.log("Firing Events with value of at least", val)
        if (Array.isArray(this.events)) {
            for (let i = 0; i < val; i += this.events[2]) {
                player.getComponent(this.events[0], this.events[1]).call(player)
            }
            return
        }
        if (typeof this.events == "object") {
            for (let n in this.events) {
                if (val >= n) {
                    player.getComponent(this.events[n][0], this.events[n][1]).call(player)
                }
            }
            return
        }
        throw Error("Invalid events type", typeof this.events)
    }
}

class OrEvent extends Event {
    loop(player) {
        let n = 0
        for (let i of this.components) {
            n += this.func(player, i[0], i[1], i[2])
        }
        return n
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
        player.getComponent(compType, compId).show(player)
    }
}

class HideEvent extends Event {
    func(player, compType, compId) {
        player.getComponent(compType, compId).hide()
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

export { Event, TextEvent, WaitEvent, CallEvent, OrEvent, AndEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, ModEvent, LootEvent }