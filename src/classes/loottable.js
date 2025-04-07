import { Component } from "./component.js";

class LootTable extends Component {
    constructor(name, table, nullWeight, skill = null,) {
        let lootTableActionDefs 
        if (skill) {
            lootTableActionDefs = [
                ["luck", 1, false, [["skill", skill, "skillLuck"]]]
            ]
        } else {lootTableActionDefs = ["luck", 1]}
        super(name, "lootTable", lootTableActionDefs)
        this.skill = skill
        this.table = table.map((l) => new TableEntry(l[0], l[1], l[2]))
        this.table.push(new TableEntry("nullEvent", nullWeight, "null"))
    }
    get luck() {
        return this.vars.luck.final
    }
    call(player) {
        console.log("Calling", this.name)
        console.log(this.table)
        let totalWeight = this.table.reduce((s, te) => te.getWeight(this.luck) + s, 0)
        let rngVal = Math.random() * totalWeight
        console.log(`Calling loot table: ${this.name}: Luck var is ${this.luck} sum of all weights is ${totalWeight}, Random Value is ${rngVal}`)
        for (let te of this.table) {
            rngVal -= te.getWeight(this.luck)
            console.log(`Testing table entry ${te.eventId}, weight is ${te.getWeight(this.luck)}, reduced random value is ${rngVal}`)
            if (rngVal <= 0) {
                te.call(player)
                return
            }
        }
    }
}

class TableEntry {
    constructor(eventId, weight, type) {
        this.eventId = eventId
        this.weight = weight
        this.type = type
    }
    getWeight(luck) {
        if (this.type == "good") {
            return this.weight * luck
        }
        if (this.type == "null" || type == "bad") {
            return this.weight / luck
        }
        return this.weight
    }
    call(player) {
        player.getComponent("event", this.eventId).call(player)
    }
}

export { LootTable }