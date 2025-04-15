import { Counter, Yield } from "./counter.js";
import { format } from "../format.js";

const skillCostInit = 10
const skillCostMult = 1.1
const skillVisThreshold = 1

const skillEffMod = 0.01
const skillYieldMod = 0.02
const skillSpeedMod = 0.02
const skillLuckMod = 0.01

const attCostInit = 50
const attCostMult = 1.2
const attVisThreshold = 10

const attPrimeBonus = 0.5
const attSecBonus = 0.25
const attTertBonus = 0.1

const spiCostInit = 5
const spiCostMult = 1.2
const spiVisThreshold = 2


class Stat extends Counter {
    constructor(name, type, max, mult, visThreshold = 1, varDefs = []) {
        let statVarDefs = [["level", 0, true]].concat(varDefs)
        super(name, type, 0, max, statVarDefs, true, false)
        this.mult = mult
        this.visThreshold = visThreshold
        this.effectDefs = [
            ["max", "more", this.type, this.id, () => this.mult ** this.baseLevel]
        ]
    }
    get baseLevel() {
        return this.vars.level.base
    }
    get level() {
        return this.vars.level.final
    }
    get max() {
        return Math.floor(super.max)
    }
    get effectScaleFactor() {
        return this.level
    }
    canEarn() {
        return true
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.level > 0 || allowPartial && this.level > 0 || this.getCost(n, flat) < this.current
    }
    earn(player, n, flat = false) {
        super.earn(player, n, flat)
        while (this.current >= this.max) {
            this.current -= this.max
            this.levelUp(player)
        }
        if (this.visible == false && this.current >= this.visThreshold) {
            this.visible = true
        }
    }
    spend(player, n, flat = false, allowPartial = false) {
        super.spend(player, n, flat, allowPartial)
        while (this.current < this.max) {
            if (this.level > 0) {
                this.levelDown(player)
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
    levelUp(player) {
        this.vars.level.base ++
        this.vars.level.update(player)
    }
    levelDown() {
        this.vars.level.base --
        this.vars.level.update(player)
    }
    display(player) {
        return `<b>${this.name}:</b><br>Lv ${this.baseLevel} (${format(this.level, 2)})<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

class Skill extends Stat {
    constructor(name, primeAtt = [], secAtt = [], tertAtt = [], effectDefs = []) {
        let skillVarDefs = [
            ["skillSpeed", 1],
            ["skillEff", 1],
            ["skillYield", 1],
            ["skillLuck", 1]
        ]
        super(name, "skill", skillCostInit, skillCostMult, skillVisThreshold, skillVarDefs)
        this.primeAtt = primeAtt
        this.secAtt = secAtt
        this.tertAtt = tertAtt
        
        this.vars.level.parentDefs = primeAtt.map((d) => ["attribute", d, "primeSkillBonus"]).concat(
            secAtt.map((d) => ["attribute", d, "secSkillBonus"])
        ).concat(tertAtt.map((d) => ["attribute", d, "tertSkillBonus"]))

        this.effectDefs = this.effectDefs.concat([
            ["skillSpeed", "inc", this.type, this.id, (n) => n * skillSpeedMod],
            ["skillEff", "inc", this.type, this.id, (n) => n * skillEffMod],
            ["skillYield", "inc", this.type, this.id, (n) => n * skillYieldMod],
            ["skillLuck", "inc", this.type, this.id, (n) => n * skillLuckMod]
        ]).concat(effectDefs)
    }
    get tooltip() {
        let primeText
        if (this.primeAtt.length > 0) {
            primeText = "<b>Primary Attributes:</b><br>" + this.primeAtt.reduce((str, c) => `${str} ${c}<br>`, "")
        } else { initCostText = ""}

        let secText
        if (this.secAtt.length > 0) {
            secText = "<b>Secondary Attributes:</b><br>" + this.secAtt.reduce((str, c) => `${str} ${c}<br>`, "")
        } else { initCostText = ""}

        let tertText
        if (this.primeAtt.length > 0) {
            tertText = "<b>Tertiary Attributes:</b><br>" + this.tertAtt.reduce((str, c) => `${str} ${c}<br>`, "")
        } else { initCostText = ""}

        return `${this.flavourText}<br>${primeText}${secText}${tertText}${this.effectText}`
    }
}

class Attribute extends Stat {
    constructor(name, effectDefs = []) {
        let attVarDefs = [
            ["primeSkillBonus", 0],
            ["secSkillBonus", 0],
            ["tertSkillBonus", 0]
        ]
        super(name, "attribute", attCostInit, attCostMult, attVisThreshold, attVarDefs)
        this.effectDefs = this.effectDefs.concat([
            ["primeSkillBonus", "flat", this.type, this.id, (n) => n * attPrimeBonus],
            ["secSkillBonus", "flat", this.type, this.id, (n) => n * attSecBonus],
            ["tertSkillBonus", "flat", this.type, this.id, (n) => n * attTertBonus],
        ]).concat(effectDefs)
        this.levelYield = new Yield("spirit", this.id, 1)
    }
    levelUp(player) {
        this.levelYield.earn(player)
        super.levelUp(player)
    }
    get tooltip() {
        return this.flavourText + "<br>" + this.effectText
    }
    initSpirit() {
        return new Spirit(this.name)
    }
}

class Spirit extends Stat {
    constructor(name) {
        super(name, "spirit", spiCostInit, spiCostMult, spiVisThreshold)
        this.effectDefs = this.effectDefs.concat([
            ["level", "flat", "attribute", this.id, (n) => n],
            ["yield", "more", "attribute", this.id, (n) => 1.01 ** n]
        ])
    }
    get tooltip() {
        return this.flavourText
    }
    display(player) {
        return `<b>${this.name}:</b><br>Lv ${this.baseLevel}<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

export { Skill, Attribute, Spirit }