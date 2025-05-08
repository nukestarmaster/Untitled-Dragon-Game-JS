const tooltipText = {
    flavourText: {
        vitals: "The natural energies of your body, used to exert your will on the world.",
        actions: "Some actions are constant.",
        limitActions: "Some actions are fleeting.",
        buildings: "It is the shaping of the world to one's will that is the line between Being and Beast.",
        resources: "Accumulated material resources",
        skills: "Hone your expertise.",
        attributes: "Refine your body.",
        spirits: "Soul mirrors Flesh, Flesh mirrors Soul.",

        baseStat_growth: "Time",

        vital_health: "Your vital lifeforce, staves off death.",
        vital_satiety: "Vital nutrition, burns away to fuel activity.",
        vital_stamina: "Your motive capability, drained by labour.",

        resource_gold: "Aurum Vitae, your very soul sings for this shining metal.",
        resource_stones: "Common stones torn from the wall of your rocky prison.",
        resource_books: "Even holding no new knowledge, their words still hold Power.",

        action_heal: "Focus your energy on restoring your wounds.",
        action_eatStone: "Your Draconis Fundimentum burns with the Fire of Stars, even these meager lifeless stones can sustain you.",
        action_rest: "Rest to recover your strength.",
        action_digStones: "The stone of these walls sucumb to your claws.",
        action_exploreCaves: "Mysteries await in these dark crevices, they call to you.",

        limitAction_breakEgg: "The safety you once felt has turned to confinement. You must out!",
        limitAction_eatEggshell: "The walls of your old home, now they feed your hunger.",
        limitAction_mineGold: "You feel the presence of gold in these walls, you must have it.",
        limitAction_lootDeadAdventurer: "A dead humanoid of some kind. You wonder what killed him",
        limitAction_readBookofRiddles: "'I am always hungry and will die if not fed, but if you touch me, you will soon turn red. What am I?' ... A dragon?",
        limitAction_readConstructionBook: "Why are humanoids so obsessed with building with wood? It's rather flammable.",

        building_buildRockpile: "Your home has become cluttered with rubble torn from the earth, put it in order.",
        building_buildHoard: "You can feel the power in your gold, with enough you can imprint your will upon it and grow in power.",
        building_buildLibrary: "Much like a hoard, but for books. A book-hoard.",

        skill_healing: "Improve your concordance of vital energies.",
        skill_eating: "Sate the hungry fires of your Draconis Fundimentum.",
        skill_resting: "Hasten the restoration of your strength.",
        skill_mining: "Hone your claws to tear through the bowels of the Earth.",
        skill_construction: "Make the mark of your intellect on this world.",
        skill_exploration: "The world is full of mysteries, you will find them.",
        skill_looting: "Oh, what delightful stores of wealth you have found.",
        skill_studying: "Plumb texts for their secrets.",

        attribute_strength: "Might of flesh.",
        attribute_constitution: "Depth of reservoirs.",
        attribute_dexterity: "Precision of claw.",
        attribute_agility: "Swiftness of foot and wing.",
        attribute_metabolism: "Effeciency of vital energies.",
        attribute_adaptability: "Mutability of Flesh",
        attribute_perception: "Keenness of senses.",
        attribute_intelligence: "Sharpness of mind.",
        attribute_luck: "Sway over the Winds of Fate.",

        spirit_strength: "Might calls to Might.",
        spirit_constitution: "Life answers Life.",
        spirit_dexterity: "Precision for Precision.",
        spirit_agility: "Gale blows to Gale.",
        spirit_metabolism: "Fire tempers Fire.",
        spirit_adaptability: "Change begets Change",
        spirit_perception: "Sight beyond Sight.",
        spirit_intelligence: "Thought springs from thought.",
        spirit_luck: "Fortune brings Fortune.",
    },
    descText: {
        vitals: "Expended as a result of actions.",
        actions: "Can be completed an unlimited number of times, may unlock new features after a number of completions.",
        limitActions: "Can be completed a limited number of times before disappearing.",
        buildings: "Can be built an unlimited number of times, but cost increases for each completion. Typically apply a bonus based on number of completions.",
        skills: "For each effective level in a skill, increase the speed, efficiency and yield of related actions by 2%, 1% and 2% respectively and the luck of related loot tables by 1%. Some skills have additional effects.",
        attributes: "For each effective level in an attribute, give 0.5, 0.25 or 0.1 bonus levels to skills of which it is the primary, secondary or tertiary attribute, respectively. Most attributes have additional effects.",
        spirits: "Gains 1 exp for every level gained in related attribute, gives 1 bonus level and a 1.01x multiplier to exp to the related attribute (compounding multiplicatively) for every level.",

        vital_health: "If this goes below 0, you die (not implemented yet).",
        vital_satiety: "Drains at a constant rate (0.5/s before modifiers) while doing any action.",

        action_digStones: "Each completion increases held stones by 0.1 and has a base 1% chance to find a vein of gold.",
        action_exploreCaves: "Has a base 10% chance to find a vein of gold and 20% chance to find a dead adventurer.",

        limitAction_mineGold: "Has a base 20% chance to find further gold.",
        limitAction_lootDeadAdventurer: "Has a base 50% chance to find a book.",

        building_buildRockpile: "Increases the maximum storage of all resources by 10% for each built.",
        building_buildHoard: "Increases all attributes by 1 and doubles stored gold for each built.",
        building_buildLibrary: "Earn 10% more experience (additive with self multiplicative with other mods) and double maximum books per level.",

        skill_healing: "Increase max health by 0.1 per level.",
        skill_eating: "Increase max satiety by 0.1 per level.",
        skill_resting: "Increase max stamina by 0.1 per level.",
        skill_studying: "Increases all skill experience earned by 1% per level, additive with similar bonuses but multiplicative with action yield (bonus not reflected in action tooltip).",

        attribute_strength: "Secondary effect not yet implemented.",
        attribute_constitution: "Increases the maximum of all vitals by 0.5 for each level",
        attribute_dexterity: "Increases efficiency of all actions by 1% per level, additive with skill efficiency mods.",
        attribute_agility: "Increases speed of all actions by 2% per level, additive with skill speed mods.",
        attribute_metabolism: "Increases efficiency and yield of all vitals by 1% per level (multiplicative with action efficiency and yield).",
        attribute_adaptability: "Increase all attribute experience earned by 1% per level, additive with similar bonuses but multiplicative with action yield (bonus not reflected in action tooltip).",
        attribute_intelligence: "Increases all skill experience earned by 5% per level, additive with similar bonuses but multiplicative with action yield (bonus not reflected in action tooltip).",
        attribute_luck: "Increases luck for all random events by 2% per level."
    },
    getTooltip(comp, id) {
        if (!id && this.flavourText[comp]) {
            return italicize(this.flavourText[comp])
        }
        if (this.flavourText[comp + "_" + id]) {
            return italicize(this.flavourText[comp + "_" + id])
        }
        return "[Tooltip Text Not Found]"
    },
    getDescripion(comp, id) {
        if (!id && this.descText[comp]) {
            return "<br>" + this.descText[comp]
        }
        if (this.descText[comp + "_" + id]) {
            return this.descText[comp + "_" + id]
        }
        return ""
    },
    save() {
        return
    },
    update() {
        return
    }
}

function italicize(str) {
    return "<i>" + str + "</i>"
}

export { tooltipText }