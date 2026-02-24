import { Collection } from "../classes/collection.js"
import { Event, TextEvent, WaitEvent, CostEvent, YieldEvent, RevealEvent, HideEvent, UpkeepEvent, LootEvent, ModEvent, CallEvent, AndEvent } from "../classes/event.js"
import { LootTable } from "../classes/loottable.js"
import { Flag } from "../classes/flag.js"

const nullEvent =               new Event("Null Event", [[]])
const testEvent =               new TextEvent("Test Event", "Hello World")

const start1 =                  new WaitEvent("Start 1", [["event", "start2", 1000]], "event1")
const start2 =                  new WaitEvent("Start 2", [["event", "start3", 1000]], "event2")
const start3 =                  new RevealEvent("Start 3", [["vital", "stamina", 0], ["limitAction", "breakEgg", 0]], "event3")

const tired =                   new RevealEvent("Tired", [["action", "rest", 0]], "tired", "tiredCond")
const tiredCond =               new AndEvent("Tired Cond", [["permFlag", "permMagicFlag", 5]], {1: ["event", "tiredFire"]}, "checking magic knowledge")
const tiredFire =               new RevealEvent("Tired Fire", [["vital", "mana"], ["action", "meditate"]], "revealing mediate")

const hatch1 =                  new RevealEvent("Hatch 1", [["vital", "health"], ["vital", "satiety"], ["limitAction", "eatEggshell"], ["action", "digStones"]], "hatched", "hatch2")
const hatch2 =                  new ModEvent("Hatch 2", [
                                                        ["flat", ["actionManager", "actionManager", "hungerRate"], 0.5],
                                                        ["flat", ["actionManager", "actionManager", "growthRate"], 1],
                                                        ["flat", ["actionManager", "actionManager", "healthRegen"], 0.01],
                                                        ], null, "hatchCond1")
const hatchCond1 =              new AndEvent("Hatch Cond 1", [["permFlag", "permMagicFlag", 5]], ["tempFlag", "magicFlag", 1], "checking magic knowledge", "hatchCond2")
const hatchCond2 =              new AndEvent("Hatch Cond 2", [["permFlag", "permConFlag", 5]], ["tempFlag", "conFlag", 1], "checking construction knowledge")

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


const readCon  =                new CallEvent("Read Con", [["tempFlag", "conFlag"], ["permFlag", "permConFlag"]], "Reading construction book")

const readCon1 =                new RevealEvent("Read Con 1", [["building", "buildTable"]], "You have learned the mysteries of the table.")
const readCon2 =                new RevealEvent("Read Con 2", [["action", "crushStones"], ["building", "buildBed"]], "This sand seems more comfortable than bare stone.")
const readCon3 =                new RevealEvent("Read Con 3", [["building", "buildStorage"]], "You have learned to build additional storage.")

const readMagic =               new CallEvent("Read Magic", [["tempFlag", "magicFlag"], ["permFlag", "permMagicFlag"]], "Reading magic book")



const readMagic1 =              new RevealEvent("Read Magic 1", [["action", "meditate"], ["spell", "prestidigitation"], ["vital", "mana"]], "You have learned the basices of mana manipulation and some simple cantrips.")
const readMagic2 =              new RevealEvent("Read Magic 2", [["spell", "grace"]], "You have learned to use mana to enhance your precision of claw.")
const readMagic3 =              new RevealEvent("Read Magic 3", [["spell", "vitality"]], "You have learned to use mana to enhance your vitals.")
const readMagic4 =              new RevealEvent("Read Magic 4", [["spell", "clarity"]], "You have learned to use mana to enhance your mind.")
const readMagic5 =              new RevealEvent("Read Magic 5", [["spell", "fortune"]], "You have learned to use mana to enhance your luck.")

const builtStorage =            new RevealEvent("Built Storage", [["action", "organizeStorage"]], "You have built your first storage.")

const events = new Collection({
    nullEvent,
    testEvent,

    start1,
    start2,
    start3,

    tired,
    tiredCond,
    tiredFire,

    hatch1,
    hatch2,
    hatchCond1,
    hatchCond2,

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

    readCon,

    readCon1,
    readCon2,
    readCon3,

    readMagic,

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

const permMagicFlag = new Flag(
    "permMagicFlag",
    25,
    null,
    {},
)

const permConFlag = new Flag(
    "permConFlag",
    15,
    null,
    {},
)

const permFlags = new Collection({
    permMagicFlag,
    permConFlag
}, "Perm Flags"
)

const magicFlag = new Flag(
    "magicFlag",
    5,
    null, 
    {
        1: ["event", "readMagic1"],
        2: ["event", "readMagic2"],
        3: ["event", "readMagic3"],
        4: ["event", "readMagic4"],
        5: ["event", "readMagic5"],
    },
)

const conFlag = new Flag(
    "conFlag",
    3,
    null,
    {
        1: ["event", "readCon1"],
        2: ["event", "readCon2"],
        3: ["event", "readCon3"],
    },
)

const tempFlags = new Collection({
    magicFlag,
    conFlag
}, "Temp Flags"
)

export { events, lootTables, permFlags, tempFlags }