const tooltipText = {
    flavourText: {
        vitals: "The natural energies of your body, used to exert your will on the world.",
        actions: "Some actions are constant.",
        limitActions: "Some actions are fleeting.",
        buildings: "It is the shaping of the world to one's will that is the line between Being and Beast.",
        resources: "Accumulated material resources.",
        spells: "Workings of power.",
        skills: "Hone your expertise.",
        attributes: "Refine your body.",
        spirits: "Soul mirrors Flesh, Flesh mirrors Soul.",

        baseStat_growth: "Time passes, power and hunger grow in lockstep.",

        vital_health: "Your vital lifeforce, staves off death.",
        vital_satiety: "Vital nutrition, burns away to fuel activity.",
        vital_stamina: "Your motive capability, drained by labour.",
        vital_mana: "Your spiritual power, used to power spells.",

        resource_gold: "Aurum Vitae, your very soul sings for this shining metal.",
        resource_crystal: "These small blue crystals glow with the inner light of raw mana.",
        resource_stones: "Common stones torn from the wall of your rocky prison.",
        resource_sand: "It's fine and soft and it gets everywhere.",
        resource_books: "Even holding no new knowledge, their words still hold Power.",

        action_heal: "Focus your energy on restoring your wounds.",
        action_eatStone: "Your Draconis Fundimentum burns with the Fire of Stars, even these meager lifeless stones can sustain you.",
        action_eatGold: "The sweet taste of this magnificent metal is tainted by loss deep felt within your soul, you can't help but prefer the lifeless stones. Nonetheless, no amount of gold helps a dreagon dead of starvation.",
        action_eatCrystal: "These glowing crystals buzz in your maw, invigorating you with arcane power. But they're to rare and valuable to rely on for sustenance except in emergencies.",
        action_rest: "Rest to recover your strength.",
        action_meditate: "Focus to accumulate power.",
        action_digStones: "The stone of these walls sucumb to your claws.",
        action_crushStones: "Crush these stones until naught remains but powder.",
        action_exploreCaves: "Mysteries await in these dark crevices, they call to you.",
        action_organizeStorage: "With a bit of light, but tedious labour, you can maximize your space.",

        limitAction_breakEgg: "The safety you once felt has turned to confinement. You must out!",
        limitAction_eatEggshell: "The walls of your old home, now they feed your hunger.",
        limitAction_mineGold: "You feel the presence of gold in these walls, you must have it.",
        limitAction_mineCrystal: "Veins of arcane crystal spiderweb through the stone.",
        limitAction_lootDeadAdventurer: "A dead humanoid of some kind. You wonder what killed him.",
        limitAction_lootDeadMage: "A dead humanoid reeking of power. Dragons have long wondered why they insist on wearing cloth.",
        limitAction_readBookofRiddles: "'I am always hungry and will die if not fed, but if you touch me, you will soon turn red. What am I?' ... A dragon?",
        limitAction_readConstructionBook: "Why are humanoids so obsessed with building with wood? It's rather flammable.",
        limitAction_readMagicBook: "The runes of High Draconic in these pages call to your very soul.",

        building_buildRockpile: "Your home has become cluttered with rubble torn from the earth, put it in order.",
        building_buildTable: "Legends tell of humanoids driven mad by eating without a table. You have no such weakness, but it's nice to have; dragons are not uncivilized beings, despite the lies.",
        building_buildBed: "Sand makes a much softer surface than bare rock.",
        building_buildStorage: "Much more refined than your primitive piles of rock.",
        building_buildHoard: "You can feel the power in your gold, with enough you can imprint your will upon it and grow in power.",
        building_buildLibrary: "Much like a hoard, but for books. A book-hoard.",
        building_buildPylon: "By aligning the crystals with the Ley Lines of the Earth, you can skim a minor amount of power for yourself.",

        spell_prestidigitation: "'Abra, Kadabra, Alakazam!' Those aren't even real words.",
        spell_grace: "'Dance upon a blade of grass!' Whatever that is.",
        spell_vitality: "'Never shall one tire under this spell!' Perhaps eventually.",
        spell_clarity: "'Glimpse Enlightenment!' Vague, but very useful, nonetheless.",
        spell_fortune: "'Fortune will ever favour you!' Humanoid mages are so pretentious.",

        skill_healing: "Improve your concordance of vital energies.",
        skill_eating: "Sate the hungry fires of your Draconis Fundimentum.",
        skill_resting: "Hasten the restoration of your strength.",
        skill_manaManipulation: "Draw in and control cosmic power.",
        skill_mining: "Hone your claws to tear through the bowels of the Earth.",
        skill_construction: "Make the mark of your intellect on this world.",
        skill_organization: "Your ancesteral memories speak of something called 'Inventory Tetris'. What's a 'Tetris', can you eat it?",
        skill_manufacture: "Enforce your might upon the material world, force a change of form.",
        skill_exploration: "The world is full of mysteries, you will find them.",
        skill_looting: "Oh, what delightful stores of wealth you have found.",
        skill_studying: "Plumb texts for their secrets.",
        skill_spellcraft: "Forge your power into spellforms.",
        skill_enhancement: "Enhancing their nature with spellforms comes naturally to all dragons.",

        attribute_strength: "Might of flesh.",
        attribute_constitution: "Depth of reservoirs.",
        attribute_dexterity: "Precision of claw.",
        attribute_agility: "Swiftness of foot and wing.",
        attribute_metabolism: "Effeciency of vital energies.",
        attribute_adaptability: "Mutability of Flesh.",
        attribute_perception: "Keenness of senses.",
        attribute_will: "Resilience of self.",
        attribute_intelligence: "Sharpness of mind.",
        attribute_luck: "Sway over the Winds of Fate.",
        attribute_power: "Force of Soul.",

        spirit_strength: "Might calls to Might.",
        spirit_constitution: "Life answers Life.",
        spirit_dexterity: "Precision for Precision.",
        spirit_agility: "Gale of Gales.",
        spirit_metabolism: "Fire tempers Fire.",
        spirit_adaptability: "Change begets Change",
        spirit_perception: "Sight beyond Sight.",
        spirit_will: "Resolve refines Resolve.",
        spirit_intelligence: "Thought springs from thought.",
        spirit_luck: "Fortune brings Fortune.",
        spirit_power: "Power grows Power.",
    },
    descText: {
        vitals: "Expended as a result of actions.",
        actions: "Can be completed an unlimited number of times, may unlock new features after a number of completions.",
        limitActions: "Can be completed a limited number of times before disappearing.",
        buildings: "Can be built an unlimited number of times, but cost increases for each completion. Typically apply a bonus based on number of completions.",
        spells: "Toggleable abilities somewhere between actions and skills. Have upkeep and produciton like actions, but can be leveled like skills. Any number of spells may be active at the same time, and they give bonuses while active, but most spells also have drawbacks (reduced by resilience). Many spells also have additional passive effects based on raw spell level (doesn't include bonuses to spell level like from spellcraft). Every level increases yield and positive effect by 5% but also increases upkeep and drawback by 2.5%.",
        skills: "For each effective level in a skill, increase the speed, efficiency and yield of related actions by 2%, 1% and 1% respectively, the luck of related loot tables by 1% and the efficiency, power and resilience of related spells by 1%. Some skills have additional effects.",
        attributes: "For each effective level in an attribute, give 0.5, 0.25 or 0.1 bonus levels to skills of which it is the primary, secondary or tertiary attribute, respectively. Most attributes have additional effects.",
        spirits: "Gains 1 exp for every level gained in related attribute, gives 1 bonus level and a 1.01x multiplier to exp to the related attribute (compounding multiplicatively) for every level. Spirits (both experience and levels) are retained on death.",

        baseStat_growth:"Grows at a constant rate while doing any action. Each level increases all attributes by 1, but also increases base Satiety drain by 0.25/s and multiplies Satiety drain by 1.05 compounding multiplicatively.",

        vital_health: "If this goes below 0, you die.",
        vital_satiety: "Drains at a constant rate while doing any action.",

        action_digStones: "Each completion adds 0.1 to maximum held stones. Can find ore veins.",
        action_exploreCaves: "Has a base 10% chance to find a vein of gold and 20% chance to find a dead adventurer.",
        action_organizeStorage: "Each completion increases all maximum held resources by 5%",

        limitAction_mineGold: "Has a base 20% chance to find further gold.",
        limitAction_mineCrystal: "Has a base 10% chance to find further crystal.",
        limitAction_lootDeadAdventurer: "Has a base 100% chance to find a book.",
        limitAction_lootDeadMage: "Highly likely to have a magic book, more likely to have additional books.",
        limitAction_readMagicBook: "Unlocks mana and meditation the first time read. Unlocks a new spell the first 5 times read.",

        building_buildRockpile: "Increases maximum resources by 10% for each built.",
        building_buildTable: "2% more efficiency, speed and yield of eating related actions per level.",
        building_buildBed: "2% more efficiency, speed and yield of resting related actions per level.",
        building_buildStorage: "10% more maximum resources and 2% more resource efficiency per level.",
        building_buildHoard: "Increases all attributes by 1 and 100% more maximum gold for each built.",
        building_buildLibrary: "10% more skill experience and 100% more maximum books per level.",
        building_buildPylon: "2% more spell power, efficiency and resilience, and 0.01 passive mana regen per level.",

        spell_prestidigitation: "Minor spell, increases skill efficiency, yield and speed by 2% without any drawback or permanent effect.",
        spell_grace: "Grants 20% more skill efficiency but has the drawback of 10% less skill yield.<br>Gives 2% increased skill efficiency and 0.25 agility and perception for every time leveled.",
        spell_vitality: "Grants 10% more vital yield and efficiency, but the drawback of 10% less skill speed.<br>Gives 1% increased vital yield and efficiency, 0.25 constitutio and 0.125 metabolism and adaptability for every time leveled.",
        spell_clarity: "Grants 10% more spell yield and efficiency, as well as 10% more skill experience, but has the drawback of 5% less skill speed, efficiency and yield.<br>Gives 1% spell efficiency, power and resilience and 0.25 inteligence and will for every time leveled.",
        spell_fortune: "Grants 10% more skill yield and random event luck but has the drawback of 10% less skill efficiency.<br>Gives 1% skill yield and random event luck, and 0.5 luck (the attribute) for every time leveled.",

        skill_healing: "Increase max health by 0.1 per level.",
        skill_eating: "Increase max satiety by 0.1 per level.",
        skill_resting: "Increase max stamina by 0.1 per level.",
        skill_manaManipulation: "Increases spell efficiency by 1% per level.",
        skill_organization: "Increases max held resources by 5% per level.",
        skill_manufacture: "Increases resource yield by 1% per level.",
        skill_studying: "Increases all skill experience earned by 1% per level, additive with similar bonuses but multiplicative with action yield.",
        skill_spellcraft: "Gives 0.125 bonus levels to all spells per level.",
        skill_enhancement: "Increases all attribute experience earned by 1% per level.",

        attribute_strength: "Secondary effect not yet implemented.",
        attribute_constitution: "Increases the maximum of all vitals by 0.5 for each level",
        attribute_dexterity: "Increases efficiency of all actions by 1% per level, additive with skill efficiency mods.",
        attribute_agility: "Increases speed of all actions by 2% per level, additive with skill speed mods.",
        attribute_metabolism: "Increases efficiency and yield of all vitals by 1% per level (multiplicative with action efficiency and yield).",
        attribute_adaptability: "Increase all attribute experience earned by 1% per level, additive with similar bonuses but multiplicative with action yield.",
        attribute_perception: "Increases spell efficiency by 2% per level.",
        attribute_will: "Increases spell resilience by 1% per level",
        attribute_intelligence: "Increases all skill experience earned by 5% per level, additive with similar bonuses but multiplicative with action yield.",
        attribute_luck: "Increases luck for all random events by 2% per level.",
        attribute_power: "Increases spell power (boosting both yield and positive effects of spells) by 1% per level."
    },
    eventText: {
        start_1: "Test"
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
    getEventText(id, n) {
        if (this.eventText[id + "_" + n]) {
            return this.eventText[id + "_" + n]
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