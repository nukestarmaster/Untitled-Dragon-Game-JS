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
    save() {
        let data = {}
        for (let k in this.data) {
            if (typeof this.data[k] != "object") {
                continue
            }
            if ("save" in this.data[k]) {
                let subData = this.data[k].save()
                if (subData && subData != {}) {
                    data[k] = subData
                }
            } else {
                console.log(`SubObject ${k} does not have save function`)
            }
        }
        if (Object.keys(data).length > 0) {
            return data
        }
        
    }
    load(data, player) {
        console.log(`Loading ${this.id}`)
        console.log(data)
        for (let k in data) {
            try {
                this.data[k].load(data[k], player)
            } catch (err) {
                console.log(`${this.id} subobject ${k} does not have load function.`)
            }
        }
    }
    update(player) {
        for (let k in this.data) {
            try {
                this.data[k].update(player)
            } catch(err) {
                console.log(`Player subobject ${k} does not have update function.`)
                console.log(err)
            }
        }
    }
}

export { Collection }