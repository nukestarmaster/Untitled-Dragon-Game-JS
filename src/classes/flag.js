import { tooltipText } from "../data/text.js"

class Flag {
    constructor(id, max, event = null, events = {}) {
        this.id = id
        this.event = event
        this.events = events
        this.max = max
        this.count = 0
    }
    call(player) {
        if (this.count >= this.max) {
            return
        }
        this.count ++
        if (this.event) {
            player.getComponent(this.event[0], this.event[1]).call(player)
        }
        if (this.events[this.count]) {
            player.getComponent(this.events[this.count][0], this.events[this.count][1]).call(player)
        }
        let text = tooltipText.getEventText(this.id, this.count)
        if (text) {
            window.alert(text)
        }
    }
    check(n) {
        return Math.floor(this.count / n)
    }
    save() {
        return {
            fired: this.count
        }
    }
    load(data) {
        this.count = data.fired
    }
    update() {
        
    }
}

export { Flag }