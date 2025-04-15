import { Collection } from "../classes/collection.js";
import { Attribute, Skill, Spirit } from "../classes/stat.js";

const mining        = new Skill("Mining", ["strength"], ["constitution", "dexterity", "perception"], ["metabolism", "intelligence", "luck"])
const resting       = new Skill("Resting", ["metabolism"], ["constitution"])
const eating        = new Skill("Eating", ["metabolism"], ["constitution"], ["dexterity"])
const construction  = new Skill("Construction", ["dexterity"], ["strength", "constitution", "intelligence"], ["perception"])
const exploration   = new Skill("Exploration", ["perception", "luck"], ["agility", "constitution"], ["dexterity", "metabolism", "intelligence"])
const looting       = new Skill("Looting", ["luck"], ["dexterity", "perception"], ["intelligence"])
const studying      = new Skill("Studying", ["intelligence"], ["perception"], [], [["yield", "inc", "skill", null, (n) => n * 0.01]])

const skills = new Collection({
    mining,
    resting,
    eating,
    construction,
    exploration,
    looting,
    studying
}, "Skills")

const strength =        new Attribute("Strength")
const constitution =    new Attribute("Constitution",   [["max", "flat", "vital", null, (n) => n * 0.5]])
const dexterity =       new Attribute("Dexterity",      [["eff", "inc", "action", null, (n) => n * 0.01],
                                                         ["eff", "inc", "limitAction", null, (n) => n * 0.01],
                                                         ["eff", "inc", "building", null, (n) => n * 0.01]])
const agility =         new Attribute("Agility",        [["speed", "inc", "action", null, (n) => n * 0.02],
                                                         ["speed", "inc", "limitAction", null, (n) => n * 0.02],
                                                         ["speed", "inc", "building", null, (n) => n * 0.02]])
const metabolism =      new Attribute("Metabolism",     [["eff", "inc", "vital", null, (n) => n * 0.01],
                                                         ["yield", "inc", "vital", null, (n) => n * 0.01]])
const perception =      new Attribute("Perception")
const intelligence =    new Attribute("Intelligence",   [["yield", "inc", "skill", null, (n) => n * 0.05]])
const luck =            new Attribute("Luck",           [["luck", "inc", "lootTable", null, (n) => n * 0.02]])

const attributeDefs = {
    strength,
    constitution,
    dexterity,
    agility,
    metabolism,
    perception,
    intelligence,
    luck,
}

const attributes = new Collection(attributeDefs, "Attributes")

const spiritDefs = {}

for (let att in attributeDefs) {
    spiritDefs[att] = attributeDefs[att].initSpirit()
}

const spirits = new Collection(spiritDefs, "Spirits")

export { skills, attributes, spirits }