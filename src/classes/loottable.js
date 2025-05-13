import { Component } from "./component.js";

class LootTable extends Component {
    constructor(name, table, nullWeight, skill = null, repeatWeight = 0) {
        let lootTableActionDefs 
        if (skill) {
            lootTableActionDefs = [
                ["luck", 1, false, [["skill", skill, "skillLuck"]]]
            ]
        } else {lootTableActionDefs = ["luck", 1]}
        super(name, "lootTable", lootTableActionDefs)
        this.skill = skill
        this.table = table.map((l) => new TableEntry(l[0], l[1], l[2], l[3]))
        this.table.push(new TableEntry("nullEvent", nullWeight, -1))
        this.table.push(new TableEntry("repeat", repeatWeight, 2, "lootTable"))
    }
    get luck() {
        return this.vars.luck.final
    }
    call() {
        console.log("Calling", this.name)
        console.log(this.table)
        let totalWeight = this.table.reduce((s, te) => te.getWeight(this.luck) + s, 0)
        let rngVal = Math.random() * totalWeight
        console.log(`Calling loot table: ${this.name}: Luck var is ${this.luck} sum of all weights is ${totalWeight}, Random Value is ${rngVal}`)
        for (let te of this.table) {
            rngVal -= te.getWeight(this.luck)
            console.log(`Testing table entry ${te.eventId}, weight is ${te.getWeight(this.luck)}, reduced random value is ${rngVal}`)
            if (rngVal <= 0) {
                if(te.eventId == "repeat") {
                    this.call()
                    this.call()
                    return
                }
                te.call(this.player)
                return
            }
        }
    }
    save() {
        return
    }
}

class TableEntry {
    constructor(eventId, weight, exp, eventType = "event") {
        this.eventType = eventType
        this.eventId = eventId
        this.weight = weight
        this.exp = exp
    }
    getWeight(luck) {
        return this.weight * luck ** this.exp
    }
    call(player) {
        player.getComponent(this.eventType, this.eventId).call(player)
    }
}

export { LootTable }