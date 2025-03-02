const framerate = 50

function gameloop(player) {
    player.lastUpdate = Date.now()
    window.setInterval(tick, 1000/framerate, player)
}

function tick(player) {
    player.actionManager.tick(player)
}



export {gameloop}