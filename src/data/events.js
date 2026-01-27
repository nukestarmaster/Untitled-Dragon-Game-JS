import { Collection } from "../classes/collection.js"
import { TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, LootEvent, ModEvent } from "../classes/event.js"
import { LootTable } from "../classes/loottable.js"

const nullEvent =               new TextEvent("Null Event")

const start1 =                  new WaitEvent("Start 1", [["event", "start2", 1000]], "event1")
const start2 =                  new WaitEvent("Start 2", [["event", "start3", 1000]], "event2")
const start3 =                  new RevealEvent("Start 3", [["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")
const tired =                   new RevealEvent("Tired", [["action", "rest", 0]], "tired")
const hatch1 =                  new RevealEvent("Hatch 1", [["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 =                  new ModEvent("Hatch 2", [
                                                        ["flat", ["actionManager", "actionManager", "hungerRate"], 0.5],
                                                        ["flat", ["actionManager", "actionManager", "growthRate"], 1],
                                                        ["flat", ["actionManager", "actionManager", "healthRegen"], 0.01],
                                                        ])
const getStone =                new RevealEvent("Get Stone", [["action", "eatStone"]], "Dug up a stone")
const tooMuchStone =            new RevealEvent("Too Much Stone", [["building", "buildRockpile"]], "The cave is getting crounded with so much stone around, why not organize it into piles?")
const findCaves =               new RevealEvent("Find Caves", [["action", "exploreCaves"]],  "You have broken into a network of dark caves")
const injured =                 new RevealEvent("Injured", [["action", "heal"]], "You have cut yourself slightly on the rocks, but you can heal yourself.")

const mineGold =                new RevealEvent("Mine Gold", [["building", "buildHoard"], ["action", "eatGold"]], "You have collected some gold.")
const readBook =                new RevealEvent("Read Book", [["building", "buildLibrary"]], "Maybe you can build a place to keep these books?")
const getCrystal =              new RevealEvent("Get Crystal", [["building", "buildPylon"], ["action", "eatCrystal"], ["vital", "mana"]], "You have found magical crystals.")

const foundGold =               new RevealEvent("Found Gold", [["limitAction", "mineGold", 1]], "You have found a small vein of native gold.")
const foundCrystal =            new RevealEvent("Found Crystal", [["limitAction", "mineCrystal", 1]], "You have found a small vein of magical crystal.")

const foundAdventurer =         new RevealEvent("Found Adventurer", [["limitAction", "lootDeadAdventurer", 1]], "You have found the corpse of a long dead humanoid, what killed him?")
const foundMage =               new RevealEvent("Found Mage", [["limitAction", "lootDeadMage", 1]], "The corpse of a humanoid mage, cloth did little to protect him.")

const foundRiddleBook =         new RevealEvent("Found Riddle Book", [["limitAction", "readBookofRiddles", 1]], "It is a book of riddles.")
const foundConstructionBook =   new RevealEvent("Found Construction Book", [["limitAction", "readConstructionBook", 1]], "It is a book on the construction of structures.")
const foundMagicBook =          new RevealEvent("Found Magic Book", [["limitAction", "readMagicBook", 1]], "It is a book on the intricacies of spellcraft.")

const readCon1 =                new RevealEvent("Read Con 1", [["building", "buildTable"]], "You have learned the mysteries of the table.")
const readCon2 =                new RevealEvent("Read Con 2", [["action", "crushStones"], ["building", "buildBed"]], "This sand seems more comfortable than bare stone.")
const readCon3 =                new RevealEvent("Read Con 3", [["building", "buildStorage"]], "You have learned to build additional storage.")

const readMagic1 =              new RevealEvent("Read Magic 1", [["action", "meditate"], ["spell", "prestidigitation"], ["vital", "mana"]], "You have learned the basices of mana manipulation and some simple cantrips.")
const readMagic2 =              new RevealEvent("Read Magic 2", [["spell", "grace"]], "You have learned to use mana to enhance your precision of claw.")
const readMagic3 =              new RevealEvent("Read Magic 3", [["spell", "vitality"]], "You have learned to use mana to enhance your vitals.")
const readMagic4 =              new RevealEvent("Read Magic 4", [["spell", "clarity"]], "You have learned to use mana to enhance your mind.")
const readMagic5 =              new RevealEvent("Read Magic 5", [["spell", "fortune"]], "You have learned to use mana to enhance your luck.")

const builtStorage =            new RevealEvent("Built Storage", [["action", "organizeStorage"]], "You have built your first storage.")

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
    findCaves,
    injured,

    mineGold,
    readBook,
    getCrystal,

    foundGold,
    foundCrystal,

    foundAdventurer,
    foundMage,

    foundRiddleBook,
    foundConstructionBook,
    foundMagicBook,

    readCon1,
    readCon2,
    readCon3,

    readMagic1,
    readMagic2,
    readMagic3,
    readMagic4,
    readMagic5,

    builtStorage
}, "Events")

const digStonesLT =     new LootTable("Dig Stone", [["foundGold", 2, 1], ["foundCrystal", 1, 1]], 97.9, "mining", 0.1)
const exploreCavesLT =  new LootTable("Explore Caves", [["foundGold", 10, 1], ["foundCrystal", 5, 1] ["foundAdventurer", 20, 1], ["foundMage", 5, 1]], 59, "exploration", 1)

const mineGoldLT =      new LootTable("Mine Gold", [["foundGold", 20, 1]], 79, "mining", 1)
const mineCrystalLT =   new LootTable("Mine Crystal", [["foundCrystal", 10, 1]], 89, "mining", 1)

const adventurerLT =    new LootTable("Adventurer", [["bookLT", 95, 1, "lootTable"]], 0, "looting", 5)
const mageLT =          new LootTable("Mage", [["bookLT", 20, 0, "lootTable"], ["foundMagicBook", 70, 0]], 0, "looting", 10)

const bookLT =          new LootTable("Book", [["foundRiddleBook", 50, 0], ["foundConstructionBook", 35, 0], ["foundMagicBook", 10, 0]], 0, "looting", 5)

const lootTables = new Collection({
    digStonesLT,
    exploreCavesLT,

    mineGoldLT,
    mineCrystalLT,

    adventurerLT,
    mageLT,

    bookLT,
}, "Loot Tables")

export { events, lootTables }