const framerate = 10

function gameloop(that) {
    that.player.lastUpdate = Date.now()
    window.setInterval(tick, 1000/framerate, that)
}

function tick(that) {
    that.player.actionManager.tick()
}



export {gameloop}