import { Collection } from "../classes/collection.js";
import { Attribute, Skill } from "../classes/stat.js";

const mining =          new Skill("Mining", ["strength"], ["constitution", "dexterity"], ["metabolism", "luck"], [["skillLuck", "inc", "skill", "mining", (n) => n * 0.05]])
const resting =         new Skill("Resting", ["metabolism"], ["constitution"])
const eating =          new Skill("Eating", ["metabolism"], ["constitution"])
const construction =    new Skill("Construction", ["dexterity"], ["strength", "constitution"])

const skills = new Collection({
    mining,
    resting,
    eating,
    construction
}, "Skills")

const strength =        new Attribute("Strength")
const constitution =    new Attribute("Constitution",   [["max", "flat", "vital", null, (n) => n * 0.5]])
const dexterity =       new Attribute("Dexterity",      [["speed", "inc", "action", null, (n) => n * 0.05],
                                                         ["speed", "inc", "limitAction", null, (n) => n * 0.05],
                                                         ["speed", "inc", "building", null, (n) => n * 0.05]])
const metabolism =      new Attribute("Metabolism",     [["eff", "inc", "vital", null, (n) => n * 0.01],
                                                         ["yield", "inc", "vital", null, (n) => n * 0.01]])
const luck =            new Attribute("Luck",           [["luck", "inc", "lootTable", null, (n) => n * 0.05]])

const attributes = new Collection({
    strength,
    constitution,
    dexterity,
    metabolism,
    luck
}, "Attributes")

export { skills, attributes }