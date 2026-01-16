import { Spell } from "../classes/stat.js";
import { Yield, Cost } from "../classes/counter.js"
import { Collection } from "../classes/collection.js"
import { SpellManager } from "../classes/manager.js"



const prestidigitation = new Spell(
    "Prestidigitation", 
    "spellcraft", 
    1,
    [new Cost("vital", "mana", 0.1)],
    [
        new Yield("skill", "spellcraft", 1),
        new Yield("skill", "manaManipulation", 0.5),
        new Yield("attribute", "will", 0.2),
        new Yield("attribute", "power", 0.1)
    ],
    [
        ["skillYield", "inc", "skill", null, 0.01],
        ["skillEff", "inc", "skill", null, 0.01],
        ["skillSpeed", "inc", "skill", null, 0.01]
    ]
)

const grace = new Spell(
    "Grace",
    "enhancement",
    0.5,
    [
        new Cost("vital", "mana", 0.5)
    ],
    [
        new Yield("skill", "enhancement", 1),
        new Yield("skill", "spellcraft", 0.5),
        new Yield("attribute", "agility", 1),
        new Yield("attribute", "perception", 1),
        new Yield("attribute", "intelligence", 0.5),
        new Yield("attribute", "will", 0.2),
        new Yield("attribute", "power", 0.1)
    ],
    [
        ["skillEff", "more", "skill", null, 0.2]
    ],
    [
        ["skillYield", "more", "skill", null, -0.1]
    ],
    [
        ["skillEff", "inc", "skill", null, 0.02],
        ["level", "flat", "attribute", "agility", 0.25],
        ["level", "flat", "attribute", "perception", 0.25]
    ]
)

const vitality = new Spell(
    "Vitality",
    "enhancement",
    0.5,
    [
        new Cost("vital", "mana", 0.7),
    ],
    [
        new Yield("vital", "stamina", 0.1, false, false),
        new Yield("skill", "enhancement", 1),
        new Yield("skill", "spellcraft", 0.5),
        new Yield("attribute", "constitution", 1),
        new Yield("attribute", "metabolism", 0.5),
        new Yield("attribute", "adaptability", 0.5),
        new Yield("attribute", "intelligence", 0.5),
        new Yield("attribute", "will", 0.2),
        new Yield("attribute", "power", 0.1)
    ],
    [
        ["eff", "more", "vital", null, 0.1],
        ["yield", "more", "vital", null, 0.1]
    ],
    [
        ["skillSpeed", "more", "skill", null, -0.1]
    ],
    [
        ["eff", "inc", "vital", null, 0.01],
        ["yield", "inc", "vital", null, 0.01],
        ["level", "flat", "attribute", "constitution", 0.25],
        ["level", "flat", "attribute", "metabolism", 0.125],
        ["level", "flat", "attribute", "adaptability", 0.125]
    ]
)

const clarity = new Spell(
    "Clarity",
    "enhancement",
    0.5,
    [
        new Cost("vital", "mana", 1)
    ],
    [
        new Yield("vital", "mana", 0.1, false, false),
        new Yield("skill", "enhancement", 1),
        new Yield("skill", "spellcraft", 0.5),
        new Yield("skill", "manaManipulation", 0.5),
        new Yield("attribute", "intelligence", 1),
        new Yield("attribute", "will", 1),
        new Yield("attribute", "power", 0.2)
    ],
    [
        ["spellEff", "more", "spell", null, 0.1],
        ["spellYield", "more", "spell", null, 0.1],
        ["yield", "more", "skill", null, 0.1]
    ],
    [
        ["skillSpeed", "more", "skill", null, -0.05],
        ["skillEff", "more", "skill", null, -0.05],
        ["skillYield", "more", "skill", null, -0.05]
    ],
    [
        ["spellEff", "inc", "spell", null, 0.01],
        ["spellPower", "inc", "spell", null, 0.01],
        ["spellRes", "inc", "spell", null, 0.01],
        ["level", "flat", "attribute", "intelligence", 0.25],
        ["level", "flat", "attribute", "will", 0.25]
    ]
)

const fortune = new Spell(
    "Fortune",
    "enhancement",
    0.5,
    [
        new Cost("vital", "mana", 1)
    ],
    [
        new Yield("skill", "enhancement", 1),
        new Yield("skill", "spellcraft", 0.5),
        new Yield("attribute", "luck", 1.5),
        new Yield("attribute", "intelligence", 0.5),
        new Yield("attribute", "will", 0.2),
        new Yield("attribute", "power", 0.1)
    ],
    [
        ["skillYield", "more", "skill", null, 0.1],
        ["luck", "more", "lootTable", null, 0.1]
    ],
    [
        ["skillEff", "more", "skill", null, -0.1]
    ],
    [
        ["skillYield", "inc", "skill", null, 0.01],
        ["luck", "inc", "lootTable", null, 0.01],
        ["level", "flat", "attribute", "luck", 0.5]
    ]
)

const spells = new Collection({
    prestidigitation,
    grace,
    vitality,
    clarity,
    fortune
}, "Spells")

const spellManager = new SpellManager

export { spells, spellManager }