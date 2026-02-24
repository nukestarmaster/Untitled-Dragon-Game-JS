import { Counter, Yield } from "./counter.js";
import { format } from "../format.js";

const spellMaxInit = 20
const spellMaxMult = 1.05
const spellVisThreshold = 100

const spellYieldMod = 0.05
const spellUpkeepMod = 0.025
const spellEffectMod = 0.05
const spellDrawbackMod = 0.025

const spellPowExp = 0.75

const skillCostInit = 10
const skillCostMult = 1.1
const skillVisThreshold = 1

const skillEffMod = 0.01
const skillYieldMod = 0.01
const skillSpeedMod = 0.02
const skillLuckMod = 0.01
const skillSpellEffMod = 0.01
const skillSpellPowMod = 0.01
const skillSpellResMod = 0.01

const attCostInit = 50
const attCostMult = 1.2
const attVisThreshold = 10

const attPrimeBonus = 0.5
const attSecBonus = 0.25
const attTertBonus = 0.125

const spiCostInit = 5
const spiCostMult = 1.1
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
    set baseLevel(int) {
        this.vars.level.base = int
    }
    get level() {
        return this.vars.level.final
    }
    get max() {
        return Math.floor(super.max)
    }
    get effectScaleFactor() {
        return this.level * this.visible
    }
    canEarn() {
        return true
    }
    canSpend(n, flat = false, allowPartial = false) {
        return this.level > 0 || allowPartial && this.level > 0 || this.getCost(n, flat) < this.current
    }
    show() {
        super.show()
        this.updateEffects()
    }
    earn(n, flat = false) {
        super.earn(n, flat)
        while (this.current >= this.max) {
            this.current -= this.max
            this.levelUp()
        }
        if (this.visible == false && this.current >= this.visThreshold) {
            this.show()
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
        this.vars.level.base ++
        this.vars.level.update(this.player)
    }
    levelDown() {
        this.vars.level.base --
        this.vars.level.update(this.player)
    }
    display() {
        return `<b>${this.name}:</b><br>Lv ${this.baseLevel} (${format(this.level, 2)})<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
    save() {
        return {
            visible: this.visible,
            current: this.current,
            baseLevel: this.baseLevel
        }
    }
}

class Spell extends Stat {
    constructor(name, skill, expYield = 1, progCost = [], progYield = [], spellEffectDefs = [], spellDrawbackDefs = [], effectDefs = []) {
        let spellVarDefs = [
            ["spellEff", 1, [["skill", skill, "skillSpellEff"]]],
            ["spellRes", 1, [["skill", skill, "skillSpellRes"]]],
            ["spellPow", 1, [["skill", skill, "skillSpellPow"]]],
            ["spellYield", 1],
            ["spellUpkeep", 1],
            ["spellEffect", 1],
            ["spellDrawback", 1],

        ]
        super(name, "spell", spellMaxInit, spellMaxMult, spellVisThreshold, spellVarDefs)
        this.skill = skill
        this.progCost = progCost
        this.progYield = progYield
        this.progYield.unshift(new Yield("spell", this.id, expYield))
        this.active = false
        this.spellEffectDefs = spellEffectDefs
        this.spellDrawbackDefs = spellDrawbackDefs
        for (let d of spellEffectDefs) {
            let base = d[4]
            if (d[1] == "more") {
                d[4] = () => 1 + base * this.effect * this.active
            } else {
                d[4] = () => base * this.effect * this.active
            }
        }
        for (let d of spellDrawbackDefs) {
            let base = d[4]
            if (d[1] == "more") {
                d[4] = () => 1 + base * this.drawback * this.active
            } else {
                d[4] = () => base * this.drawback * this.active
            }
        }
        for (let d of effectDefs) {
            let base = d[4]
            if (d[1] == "more") {
                d[4] = () => 1 + base * this.vars.level.base
            } else {
                d[4] = () => base * this.vars.level.base
            }
        }

        this.effectDefs = this.effectDefs.concat([
            ["spellYield", "inc", this.type, this.id, spellYieldMod],
            ["spellUpkeep", "inc", this.type, this.id, spellUpkeepMod],
            ["spellEffect", "inc", this.type, this.id, spellEffectMod],
            ["spellDrawback", "inc", this.type, this.id, spellDrawbackMod]
        ]).concat(spellEffectDefs).concat(spellDrawbackDefs).concat(effectDefs)
    }
    get effect() {
        return this.vars.spellEffect.final * this.vars.spellPow.final ** spellPowExp   
    }
    get drawback() {
        return this.vars.spellDrawback.final / this.vars.spellRes.final
    }
    get progYieldMod() {
        return this.vars.spellYield.final * this.vars.spellPow.final
    }
    get progCostMod() {
        return this.vars.spellUpkeep.final / this.vars.spellEff.final
    }
    activate() {
        this.player.spellManager.activateSpell(this)
        this.active = true
        this.updateEffects()
        console.log(this)
    }
    deactivate() {
        this.player.spellManager.deactivateSpell(this)
        this.active = false
        this.updateEffects()
        console.log(this)
    }
    click() {
        if (this.active) {
            this.deactivate()
            return
        }
        if (!this.clickable()) {
            return
        }
        this.activate()
    }
    clickable() {
        let dt = this.player.dt
        if (!this.visible) {
            return false
        }
        if (!this.progCost.every((c) => c.canSpend(this.player, dt * this.progCostMod, true))) {
            return false
        }
        if (!this.progYield.every((c) => c.canEarn(this.player, dt * this.progYieldMod))) {
            return false
        }
        return true
    }
    tick() {
        let dt = this.player.dt
        if (this.clickable()) {
            this.progCost.map((c) => c.spend(this.player, dt * this.progCostMod, true))
            if (!this.clickable()) {
                this.deactivate()
            }
            this.progYield.map((y) => y.earn(this.player, dt * this.progYieldMod))
        }
    }
    get tooltip() {
        let skillText
        if (this.skill) {
            skillText =  `<b>Related Skill:</b> ${this.skill}<br>`
        } else { skillText = ""}

        let progCostText
        if (this.progCost.length > 0) {
            progCostText = "<b>Progress Cost</b>:<br>" + this.progCost.reduce((str, c) => `${str} ${c.display(this.player, this.progCostMod)}/s<br>`, "")
        } else { progCostText = ""}

        let progYieldText
        if (this.progYield.length > 0) {
            progYieldText = "<b>Progress Yield</b>:<br>" + this.progYield.reduce((str, c) => `${str} ${c.display(this.player, this.progYieldMod)}/s<br>`, "")
        } else { progYieldText = ""}

        let effectText = "<b>Effect Scale</b>: " + format(this.effect, 3) + "<br>"

        let drawbackText = "<b> Drawback Scale</b>: " + format(this.drawback, 3) + "<br>"

        return `${this.flavourText}<br>${skillText}${progCostText}${progYieldText}${effectText}${drawbackText}${this.effectText}`
    }
}

class Skill extends Stat {
    constructor(name, primeAtt = [], secAtt = [], tertAtt = [], effectDefs = []) {
        let skillVarDefs = [
            ["skillSpeed", 1],
            ["skillEff", 1],
            ["skillYield", 1],
            ["skillLuck", 1],
            ["skillSpellEff", 1],
            ["skillSpellRes", 1],
            ["skillSpellPow", 1]
        ]
        super(name, "skill", skillCostInit, skillCostMult, skillVisThreshold, skillVarDefs)
        this.primeAtt = primeAtt
        this.secAtt = secAtt
        this.tertAtt = tertAtt
        
        this.vars.level.parentDefs = primeAtt.map((d) => ["attribute", d, "primeSkillBonus"]).concat(
            secAtt.map((d) => ["attribute", d, "secSkillBonus"])
        ).concat(tertAtt.map((d) => ["attribute", d, "tertSkillBonus"]))

        this.effectDefs = this.effectDefs.concat([
            ["skillSpeed", "inc", this.type, this.id, skillSpeedMod],
            ["skillEff", "inc", this.type, this.id, skillEffMod],
            ["skillYield", "inc", this.type, this.id, skillYieldMod],
            ["skillLuck", "inc", this.type, this.id, skillLuckMod],
            ["skillSpellEff", "inc", this.type, this.id, skillSpellEffMod],
            ["skillSpellRes", "inc", this.type, this.id, skillSpellResMod],
            ["skillSpellPow", "inc", this.type, this.id, skillSpellPowMod]
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
            ["primeSkillBonus", "flat", this.type, this.id, attPrimeBonus],
            ["secSkillBonus", "flat", this.type, this.id, attSecBonus],
            ["tertSkillBonus", "flat", this.type, this.id, attTertBonus],
        ]).concat(effectDefs)
        this.levelYield = new Yield("spirit", this.id, 1)
    }
    levelUp() {
        this.levelYield.earn(this.player)
        super.levelUp()
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
            ["level", "flat", "attribute", this.id, 1],
            ["yield", "more", "attribute", this.id, (n) => 1.01 ** n]
        ])
    }
    get tooltip() {
        return this.flavourText
    }
    display() {
        return `<b>${this.name}:</b><br>Lv ${this.baseLevel}<br>Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

class Growth extends Stat {
    constructor() {
        super("Growth", "baseStat", 200, 1, 100, )
        this.effectDefs = this.effectDefs.concat([
            ["level", "flat", "attribute", null, 1],
            ["hungerRate", "flat", "actionManager", "actionManager", 0.25],
            ["hungerRate", "more", "actionManager", "actionManager", (n) => 1.05 ** n]
        ])
    }
    get tooltip() {
        let healthRegenText = ""
        if (this.player.actionManager.healthRegenRate) {
            healthRegenText = `Health Regen: ${this.player.actionManager.healthRegen.getYield(this.player, this.player.actionManager.healthRegenRate)}/s<br>`
        }
        let staminaRegenText = ""
        if (this.player.actionManager.staminaRegenRate) {
            staminaRegenText = `Stamina Regen: ${this.player.actionManager.staminaRegen.getYield(this.player, this.player.actionManager.staminaRegenRate)}/s<br>`
        }
        let manaRegenText = ""
        if (this.player.actionManager.manaRegenRate) {
            manaRegenText = `Mana Regen: ${this.player.actionManager.manaRegen.getYield(this.player, this.player.actionManager.manaRegenRate)}/s<br>`
        }
        return `${this.flavourText}<br>
        Satiety Upkeep: ${format(this.player.actionManager.hunger.getCost(this.player, this.player.actionManager.hungerRate), 2)}/s<br>
        Gain: ${format(this.player.actionManager.growth.getYield(this.player, this.player.actionManager.growthRate), 2)}/s<br>
        ${healthRegenText}
        ${staminaRegenText}
        ${manaRegenText}
        ${this.effectText}`
    }
    display() {
        return `<b>${this.name}:</b> 
        
        Lv ${this.baseLevel} Exp: ${format(this.current)} / ${format(this.max)}`
    }
}

export { Spell, Skill, Attribute, Spirit, Growth }