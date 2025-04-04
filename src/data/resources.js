
import { Collection } from "../classes/collection.js";
import { Resource } from "../classes/resource.js";

const gold = new Resource("Gold", 0, 10)
const stones = new Resource("Stones", 0, 100)

const resources = new Collection({
    gold,
    stones
}, "Resources")

export { resources }