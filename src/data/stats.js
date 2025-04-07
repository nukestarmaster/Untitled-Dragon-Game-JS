import { Collection } from "../classes/collection.js";
import { Attribute, Skill, Spirit } from "../classes/stat.js";

const mining =          new Skill("Mining", ["strength"], ["constitution", "dexterity", "perception"], ["metabolism", "luck"], [["skillLuck", "inc", "skill", "mining", (n) => n * 0.01]])
const resting =         new Skill("Resting", ["metabolism"], ["constitution"])
const eating =          new Skill("Eating", ["metabolism"], ["constitution"])
const construction =    new Skill("Construction", ["dexterity"], ["strength", "constitution"], ["perception"])
const exploration =     new Skill("Exploration", ["perception", "luck"], ["agility", "constitution"], ["dexterity", "metabolism"], [["skillLuck", "inc", "skill", "exploration", (n) => n * 0.01]])

const skills = new Collection({
    mining,
    resting,
    eating,
    construction,
    exploration
}, "Skills")

const strength =        new Attribute("Strength")
const constitution =    new Attribute("Constitution",   [["max", "flat", "vital", null, (n) => n * 0.5]])
const dexterity =       new Attribute("Dexterity",      [["speed", "inc", "action", null, (n) => n * 0.05],
                                                         ["speed", "inc", "limitAction", null, (n) => n * 0.05],
                                                         ["speed", "inc", "building", null, (n) => n * 0.05]])
const agility =         new Attribute("Agility")
const metabolism =      new Attribute("Metabolism",     [["eff", "inc", "vital", null, (n) => n * 0.01],
                                                         ["yield", "inc", "vital", null, (n) => n * 0.01]])
const perception =      new Attribute("Perception")
const luck =            new Attribute("Luck",           [["luck", "inc", "lootTable", null, (n) => n * 0.05]])

const attributeDefs = {
    strength,
    constitution,
    dexterity,
    agility,
    metabolism,
    perception,
    luck,
}

const attributes = new Collection(attributeDefs, "Attributes")

const spiritDefs = {}

for (let att in attributeDefs) {
    spiritDefs[att] = attributeDefs[att].initSpirit()
}

const spirits = new Collection(spiritDefs, "Spirits")

export { skills, attributes, spirits }