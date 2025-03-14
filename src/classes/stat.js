import { Counter } from "./counter.js";
import { format } from "../format.js";
import { getComponent } from "../player.js";

const skillCostInit = 10
const skillCostMult = 1.1
const skillVisThreshold = 1

const attCostInit = 50
const attCostMult = 1.2
const attVisThreshold = 10


class Stat extends Counter {
    constructor(name, max, mult, visThreshold = 1) {
        super(name, 0, max, true, false)
        this.initMax = max
        this.mult = mult
        this.level = 0
        this.visThreshold = visThreshold
    }
    canEarn() {
        return true
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.level > 0 || allowPartial && this.level > 0 || this.getCost(n, flat) < this.current
    }
    earn(n, flat = false) {
        super.earn(n, flat)
        while (this.current >= this.max) {
            this.current -= this.max
            this.levelUp()
        }
        if (this.visible == false && this.current >= this.visThreshold) {
            this.visible = true
        }
    }
    spend(n, flat = false, allowPartial = false) {
        super.spend(n, flat, allowPartial)
        while (this.current < this.max) {
            if (this.level > 0) {
                this.levelDown()
                this.current += this.max
            }
            else {
                this.current = 0
            }
        }
    }
    clickable() {
        return false
    }
    levelUp() {
        this.level ++
        this.max = Math.floor(this.initMax * (this.mult ** this.level))
    }
    levelDown() {
        this.level --
        this.max = Math.floor(this.initMax * (this.mult ** this.level))
    }
    getLevel(player) {
        return this.level
    }
    display(player) {
        return `<b>${this.name}:</b> Lv ${this.level} (${this.getLevel(player)})<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

class Skill extends Stat {
    constructor(name, majorAtt = [], midAtt = [], minorAtt= []) {
        super(name, skillCostInit, skillCostMult, skillVisThreshold)
        this.majorAtt = majorAtt
        this.midAtt = midAtt
        this.minorAtt = minorAtt
        this.type = "skill"
    }
    getLevel(player) {
        return this.level + this.skillBonus(player)
    }
    skillBonus(player) {
        return this.majorAtt.reduce((s, a) => s + getComponent(player, "attribute", a).level, 0) * 0.5 + 
        this.midAtt.reduce((s, a) => s + getComponent(player, "attribute", a).level, 0) * 0.25 + 
        this.minorAtt.reduce((s, a) => s + getComponent(player, "attribute", a).level, 0) * 0.1
    }
}

class Attribute extends Stat {
    constructor(name) {
        super(name, attCostInit, attCostMult, attVisThreshold)
    }
}

export { Skill, Attribute }