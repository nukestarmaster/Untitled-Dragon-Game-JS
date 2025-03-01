import { Yield, Counter, Cost } from "./counter.js"

function gameloop(that) {
    that.player.lastUpdate = Date.now()
    window.setInterval(tick, 100, that)
}

function tick(that, actionManager) {
    let t = Date.now()
    let dt = (t - that.player.lastUpdate) / 1000
    that.player.lastUpdate = t
    that.player.actionManager.tick(dt)
    that.player.actionManager.dt = dt
}



export {gameloop}