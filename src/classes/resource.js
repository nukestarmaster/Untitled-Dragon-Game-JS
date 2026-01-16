import { Counter } from "./counter.js";

class Resource extends Counter {
    constructor(name, initial, max, revealEvent = null) {
        super(name, "resource", initial, max, [], false, true)
        this.revealEvent = revealEvent
    }
    get tooltip() {
        return this.flavourText + "<br>" + this.effectText
    }
    earn( n, flat = false) {
        super.earn(n, flat)
        if (this.visible == false && this.current >= 1) {
            this.show()
        }
    }
    show() {
        if (this.revealEvent) {
            this.player.getComponent("event", this.revealEvent).call(this.player)
        }
        super.show()
    }
}

export { Resource }