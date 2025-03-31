import { tooltipText } from "../data/text.js"
import { camelCase } from "../player.js"

class Collection {
    constructor(obj, name) {
        for (let k in obj) {
            this[k] = obj[k]
        }
        this.name = name
        this.id = camelCase(name)
        this.flavourText = tooltipText.getTooltip(this.id)
        this.descText = tooltipText.getDescripion(this.id)
    }
    init(player) {
        for (let c in this) {
            if (this[c].init) {
                this[c].init(player)
            }
        }
    }
    display() {
        return this.name
    }
    get tooltip() {
        return this.flavourText + this.descText
    }
}

export { Collection }