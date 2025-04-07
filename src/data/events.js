import { Collection } from "../classes/collection.js"
import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, LootEvent } from "../classes/event.js"
import { LootTable } from "../classes/loottable.js"

const nullEvent =       new TextEvent("Null Event")
const start1 =          new WaitEvent("Start 1", [["event", "start2", 1000]], "event1")
const start2 =          new WaitEvent("Start 2", [["event", "start3", 1000]], "event2")
const start3 =          new RevealEvent("Start 3", [["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")
const tired =           new RevealEvent("Tired", [["action", "rest", 0]], "tired")
const hatch1 =          new RevealEvent("Hatch 1", [["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 =          new UpkeepEvent("Hatch 2", [["vital", "satiety", 0.5]])
const getStone =        new RevealEvent("Get Stone", [["action", "eatStone"]], "Dug up a stone")
const tooMuchStone =    new RevealEvent("Too Much Stone", [["building", "buildRockpile"]], "The cave is getting crounded with so much stone around, why not organize it into piles?")
const mineStoneLT =     new LootEvent("Mine Stone LT", [["mineStone", 1]], "")
const foundGold =       new RevealEvent("Found Gold", [["limitAction", "mineGold", 1]], "You have found a small vein of native gold.")
const mineGold =        new RevealEvent("Mine Gold", [["building", "buildHoard"]], "You have collected some gold.")
const findCaves =       new RevealEvent("Find Caves", [["action", "exploreCaves"]],  "You have broken into a network of dark caves")

const events = new Collection({
    nullEvent,
    start1,
    start2,
    start3,
    tired,
    hatch1,
    hatch2,
    getStone,
    tooMuchStone,
    mineStoneLT,
    foundGold,
    mineGold,
    findCaves
}, "Events")

const digStonesLT =     new LootTable("Dig Stone", [["foundGold", 1, "good"]], 99, "mining")
const mineGoldLT =      new LootTable("Mine Stone", [["foundGold", 20, "good"]], 80, "mining")
const exploreCavesLT =  new LootTable("Explore Caves", [["foundGold", 10, "good"]], 90, "exploration")

const lootTables = new Collection({
    digStonesLT,
    mineGoldLT,
    exploreCavesLT
}, "Loot Tables")

export { events, lootTables }