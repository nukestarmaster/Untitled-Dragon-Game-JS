const framerate = 100

function gameloop(player) {
    player.lastUpdate = Date.now()
    player.dt = 0
    window.setInterval(tick, 1000/framerate, player)
}

function tick(player) {
    if (player.actionManager.ticking) {
        let t0 = player.lastUpdate
        let t1 = Date.now()
        player.lastUpdate = t1
        player.dt = Math.min((t1 - t0) / 1000, 0.1)
        player.actionManager.tick(player.dt)
        player.spellManager.tick(player.dt)
    } else {
        player.lastUpdate = Date.now()
    }
}

export {gameloop}