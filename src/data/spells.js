import { Spell } from "../classes/stat.js";
import { Yield, Cost } from "../classes/counter.js"
import { Collection } from "../classes/collection.js"
import { SpellManager } from "../classes/manager.js"



const test = new Spell(
    "Test",
    "mining",
    [
        new Cost("vital", "stamina", 0.1)
    ],
    [
        new Yield("spell", "test", 1)
    ],
    [
        ["max", "more", "vital", "health", 1]
    ]
)

const spells = new Collection({
    test
}, "Spells")

const spellManager = new SpellManager

export { spells, spellManager }