import { Collection } from "../classes/collection.js"
import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, LootEvent, ModEvent } from "../classes/event.js"
import { LootTable } from "../classes/loottable.js"

const nullEvent =               new TextEvent("Null Event")

const start1 =                  new WaitEvent("Start 1", [["event", "start2", 1000]], "event1")
const start2 =                  new WaitEvent("Start 2", [["event", "start3", 1000]], "event2")
const start3 =                  new RevealEvent("Start 3", [["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")
const tired =                   new RevealEvent("Tired", [["action", "rest", 0]], "tired")
const hatch1 =                  new RevealEvent("Hatch 1", [["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 =                  new ModEvent("Hatch 2", [["flat", ["actionManager", "actionManager", "hungerRate"], 0.5]])
const getStone =                new RevealEvent("Get Stone", [["action", "eatStone"]], "Dug up a stone")
const tooMuchStone =            new RevealEvent("Too Much Stone", [["building", "buildRockpile"]], "The cave is getting crounded with so much stone around, why not organize it into piles?")
const mineGold =                new RevealEvent("Mine Gold", [["building", "buildHoard"]], "You have collected some gold.")
const findCaves =               new RevealEvent("Find Caves", [["action", "exploreCaves"]],  "You have broken into a network of dark caves")
const readBook =                new RevealEvent("Read Book", [["building", "buildLibrary"]], "Maybe you can build a place to keep these books?")
const injured =                 new RevealEvent("Injured", [["action", "heal"]], "You have cut yourself slightly on the rocks, but you can heal yourself.")

const foundGold =               new RevealEvent("Found Gold", [["limitAction", "mineGold", 1]], "You have found a small vein of native gold.")
const foundAdventurer =         new RevealEvent("Found Adventurer", [["limitAction", "lootDeadAdventurer", 1]], "You have found the corpse of a long dead humanoid, what killed him?")
const foundRiddleBook =         new RevealEvent("Found Riddle Book", [["limitAction", "readBookofRiddles", 1]], "It is a book of riddles.")
const foundConstructionBook =   new RevealEvent("Found Construction Book", [["limitAction", "readConstructionBook", 1]], "It is a book on the construction of structures.")

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
    mineGold,
    findCaves,
    readBook,
    injured,

    foundGold,
    foundAdventurer,
    foundRiddleBook,
    foundConstructionBook
}, "Events")

const digStonesLT =     new LootTable("Dig Stone", [["foundGold", 1, 1]], 98.9, "mining", 0.1)
const mineGoldLT =      new LootTable("Mine Stone", [["foundGold", 20, 1]], 79, "mining", 1)
const exploreCavesLT =  new LootTable("Explore Caves", [["foundGold", 10, 1], ["foundAdventurer", 20, 1]], 69, "exploration", 1)
const adventurerLT =    new LootTable("Adventurer", [["bookLT", 95, 1, "lootTable"]], 0, "looting", 5)
const bookLT =          new LootTable("Book", [["foundRiddleBook", 50, 0], ["foundConstructionBook", 50, 0]], 0, "looting")

const lootTables = new Collection({
    digStonesLT,
    mineGoldLT,
    exploreCavesLT,
    adventurerLT,
    bookLT,
}, "Loot Tables")

export { events, lootTables }