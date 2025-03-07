import { Counter } from "./counter";
const skillCostInit = 10
const skillCostMult = 1.1

const attCostInit = 50
const attCostMult = 1.2


class Stat extends Counter {
    constructor(name, max, mult) {
        super(name, 0, max, true, false)
        this.initMax = max
        this.mult = mult
        this.level = 0
    }
    canEarn() {
        return true
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.level > 0 || allowPartial && this.level > 0 || this.getCost(n, flat) < this.current
    }
    earn(n, flat = false) {
        super.earn(n, flat)
        if (this.current > this.max) {
            this.current -= this.max
            this.levelUp()
        }
    }
    spend(n, flat = false, allowPartial = false) {
        super.spend(n, flat, allowPartial)
        if (this.current < this.max) {
            if (this.level > 0) {
                this.levelDown()
                this.current += this.max
            }
            else {
                this.current = 0
            }
        }
    }
    levelUp() {
        this.level ++
        this.max = Math.floor(this.initMax * (this.mult ^ this.level))
    }
    levelDown() {
        this.level --
        this.max = Math.floor(this.initMax * (this.mult ^ this.level))
    }
    effLevel() {
        return this.level
    }
    display() {
        return `<b>${this.name}:</b> Lv ${this.level}<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

class Skill extends Stat {
    constructor(name, majorAtt = [], midAtt = [], minorAtt) {
        super(name, skillCostInit, skillCostMult)
        this.majorAtt = majorAtt
        this.midAtt = midAtt
        this.minorAtt = minorAtt
        this.type = "skill"
    }
}

export { Skill }