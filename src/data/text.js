
const tooltipText = {
    flavourText: {
        vitals: "The natural energies of your body, used to exert your will on the world.",
        actions: "Some actions are constant.",
        limitActions: "Some actions are fleeting.",
        buildings: "It is the shaping of the world to one's will that is the line between Being and Beast.",
        skills: "Hone your expertise.",
        attributes: "Refine your body.",

        vital_health: "Your vital lifeforce, staves off death.",
        vital_stamina: "Your motive capability, drained by labour.",
        vital_satiety: "Vital nutrition, burns away to fuel activity.",

        resource_stones: "Common stones torn from the wall of your rocky prison.",

        action_rest: "Rest to recover your strength.",
        action_digStones: "The stone of these walls sucumb to your claws.",
        action_eatStone: "Your Draconis Fundimentum burns with the Fire of Stars, even these meager lifeless stones can sustain you.",

        limitAction_breakEgg: "The safety you once felt has turned to confinement. You must out!",
        limitAction_eatEggshell: "The walls of your old home, now they feed your hunger.",

        building_buildRockpile: "Your home has become cluttered with rubble torn from the earth, put it in order.",

        skill_mining: "Hone your claws to tear through the bowels of the Earth.",
        skill_resting: "Hasten the restoration of your strength.",
        skill_eating: "Tame the hungry fires of your Draconis Fundimentum.",
        skill_construction: "Learn to make the mark of your intellect on this world.",

        attribute_strength: "Might of flesh.",
        attribute_constitution: "Depth of reservoirs.",
        attribute_dexterity: "Precision of claw.",
        attribute_metabolism: "Effeciency of vital energies."
    },
    descText: {
        vitals: "Expended as a result of actions.",
        actions: "Can be completed an unlimited number of times, may unlock new features after a number of completions.",
        limitActions: "Can be completed a limited number of times before disappearing.",
        buildings: "Can be built an unlimited number of times, but cost increases for each completion. Typically apply a bonus based on number of completions.",
        skills: "For each effective level in a skill, increase the speed of related actions by 5% and the efficiency and yield of them by 1%. Some actions have additional effects.",
        attributes: "For each effective level in an attribute, give 0.5, 0.25 or 0.1 bonus levels to skills of which it is the primary, secondary or tertiary attribute, respectively. Some attributes have additional effects.",

        vital_health: "If this reaches 0, you die (not implemented yet).",
        vital_satiety: "Drains at a constant rate (0.5/s before modifiers) while doing any action.",

        building_buildRockpile: "Increases the maximum storage of all resources by 10% for each built.",

        skill_mining: "Test",

        attribute_strength: "Secondary effect not yet implemented.",
        attribute_constitution: "Increases the maximum of all vitals by 0.5 for each level",
        attribute_dexterity: "Increases speed of all actions by 5% for all actions, additive with skill speed mods.",
        attribute_metabolism: "Increases efficiency and yield of all vitals by 1% per level (multiplicative with action efficiency and yield)."
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
    }
}

function italicize(str) {
    return "<i>" + str + "</i>"
}

export { tooltipText }