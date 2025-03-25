import { Collection } from "../classes/collection.js";
import { Attribute, Skill } from "../classes/stat.js";

const mining = new Skill("Mining", ["strength"], ["constitution", "dexterity"], ["metabolism"])
const resting = new Skill("Resting", ["metabolism"], ["constitution"])
const eating = new Skill("Eating", ["metabolism"], ["constitution"])
const construction = new Skill("Construction", ["dexterity"], ["strength", "constitution"],)

const skills = new Collection({
    mining,
    resting,
    eating,
    construction
})

const strength = new Attribute("Strength")
const constitution = new Attribute("Constitution", [["max", "flat", "vital", null, (n) => n * 0.5]])
const dexterity = new Attribute("Dexterity")
const metabolism = new Attribute("Metabolism", [["eff", "inc", "vital", null, (n) => n * 0.01],
                                                ["yield", "inc", "vital", null, (n) => n * 0.01]])

const attributes = new Collection({
    strength,
    constitution,
    dexterity,
    metabolism
})

export { skills, attributes }