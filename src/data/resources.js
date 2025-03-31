
import { Collection } from "../classes/collection.js";
import { Resource } from "../classes/resource.js";


const stones = new Resource("Stones", 0, 100)

const resources = new Collection({
    stones
}, "Resources")

export { resources }