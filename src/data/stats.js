import { Attribute, Skill } from "../classes/stat.js";

const mining = new Skill("Mining", ["strength"], ["constitution", "dexterity"], ["metabolism"])
const resting = new Skill("Resting", ["metabolism"], ["constitution"])
const eating = new Skill("Eating", ["metabolism"], ["constitution"])

const skills = {
    mining,
    resting,
    eating
}

const strength = new Attribute("Strength")
const constitution = new Attribute("Constitution")
const dexterity = new Attribute("Dexterity")
const metabolism = new Attribute("Metabolism")

const attributes = {
    strength,
    constitution,
    dexterity,
    metabolism
}

export { skills, attributes }