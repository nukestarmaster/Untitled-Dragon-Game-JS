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
const mineGold =        new RevealEvent("Mine Gold", [["building", "buildHoard"]], "You have collected some gold.")
const findCaves =       new RevealEvent("Find Caves", [["action", "exploreCaves"]],  "You have broken into a network of dark caves")
const readBook =        new RevealEvent("Read Book", [["building", "buildLibrary"]], "Maybe you can build a place to keep these books?")

const foundGold =       new RevealEvent("Found Gold", [["limitAction", "mineGold", 1]], "You have found a small vein of native gold.")
const foundAdventurer = new RevealEvent("Found Adventurer", [["limitAction", "lootDeadAdventurer", 1]], "You have found the corpse of a long dead humanoid, what killed him?")
const foundBook =       new LootEvent("Found Book", [["bookLT", 1]], "You have found a book.")
const foundRiddleBook = new RevealEvent("Found Riddle Book", [["limitAction", "readBookofRiddles", 1]], "It is a book of riddles.")

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

    foundGold,
    foundAdventurer,
    foundBook,
    foundRiddleBook,
}, "Events")

const digStonesLT =     new LootTable("Dig Stone", [["foundGold", 1, "good"]], 99, "mining")
const mineGoldLT =      new LootTable("Mine Stone", [["foundGold", 20, "good"]], 80, "mining")
const exploreCavesLT =  new LootTable("Explore Caves", [["foundGold", 10, "good"], ["foundAdventurer", 20, "good"]], 70, "exploration")
const adventurerLT =    new LootTable("Adventurer", [["foundBook", 100, "good"]], 0, "looting")
const bookLT =          new LootTable("Book", [["foundRiddleBook", 50, "good"]], 50, "looting")

const lootTables = new Collection({
    digStonesLT,
    mineGoldLT,
    exploreCavesLT,
    adventurerLT,
    bookLT,
}, "Loot Tables")

export { events, lootTables }