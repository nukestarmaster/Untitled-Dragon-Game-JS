import { tooltipText } from "../data/text.js"
import { camelCase } from "../player.js"

class Collection {
    constructor(obj, name) {
        this.data = obj
        this.name = name
        this.id = camelCase(name)
        this.visible = false
        this.flavourText = tooltipText.getTooltip(this.id)
        this.descText = tooltipText.getDescripion(this.id)
    }
    init(player) {
        for (let c in this.data) {
            if (this.data[c].init) {
                this.data[c].init(player)
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