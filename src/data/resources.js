
import { Collection } from "../classes/collection.js";
import { Resource } from "../classes/resource.js";

const gold = new Resource("Gold", 0, 10, "mineGold")
const stones = new Resource("Stones", 0, 100)
const books = new Resource("Books", 0, 20, "readBook")

const resources = new Collection({
    gold,
    stones,
    books
}, "Resources")

export { resources }