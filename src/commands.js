export function parseCommand(player, command, ...args) {
    if (!command) {
        Console.log("No command specified.")
        return
    }
    if (command in commands) {
        console.log(`Firing command ${command} with args ${args}`)
        commands[command](player, ...args)
        return
    }
    console.log("Invalid Command.")
}

const commands = {
    "echo": echo,
    "fireEvent": fireEvent,
    "setLevel": setLevel,
    "setAllLevel": setAllLevel,
    "die": die,
}

function echo(player, ...text) {
    window.alert(text.join(" "))
}

function fireEvent(player, eventId) {
    if (!eventId) {
        console.log("No event name specified")
        return
    }
    try {
        player.getComponent("event", eventId).call(player)
    } catch (error) {
        console.log("Invalid Event")
    }
}

function setLevel(player, type, id, level) {
    if (!type) {
        console.log("No type specified.")
        return 0
    }
    if (!id) {
        console.log("No id specified.")
        return 0
    }
    if (!level) {
        console.log("No level specified.")
        return 0
    }
    if (typeof level != Number) {
        console.log(`Level must be a number, given ${level}`)
    }
    try {
        let component = player.getComponent(type, id)
    } catch (error) {
        console.log("invalid component.")
        return 0
    }
    if (component.baseLevel) {
        component.baseLevel = Math.floor(level)
        component.level.update(player)
        return 1
    } else {
        console.log(`Components of type ${type} do not have levels.`)
        return 0
    }
}

function setAllLevel(player, type, level) {
    if (!type) {
        console.log("No type specified.")
        return
    }
    if (!level) {
        console.log("No level specified.")
        return
    }
    if (typeof level != Number) {
        console.log(`Level must be a number, given ${level}`)
        return
    }
    list = player.getComponentClass(type)
    if (!list) {
        console.log(`Type ${type} does not exist.`)
    }
    for (c in list) {
        if (!setLevel(player, type, c, level)) {
            return
        }
    }
}

function die(player) {
    player.die()
}