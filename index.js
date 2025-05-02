import { player, returnCounters, startEvent } from "./src/player.js";
import { gameloop } from "./src/gameloop.js"
import { format } from "./src/format.js"

const app = Vue.createApp({
    el: "#app",
    data() {
        return {
            player: player,
            renderComponent: true
        }
    },
    methods: {
        click: function click(button) {
            button.click(this.player)
        },
        format: format,
        returnCounters: returnCounters,
        save: function save() {
            console.log("Saving ...")
            localStorage.setItem("player", JSON.stringify(this.player))
            console.log("Finished Saving!")
        },
        load: function load() {
            if (!localStorage.getItem("player")) {
                console.log("No player data to load")
                return false
            }
            this.player.load(JSON.parse(localStorage.getItem("player")))
            this.player.update(this)
            if (this.player.getComponent("limitAction", "breakEgg").limit > 0 && !this.player.getComponent("limitAction", "breakEgg").visible) {
                return false
            }
            return true
        },
        reset: function reset() {
            localStorage.removeItem("player")
            location.reload()
        }
    },
    beforeMount() {
        this.player.init()
        let loaded = this.load()
        gameloop(this.player)
        if (!loaded) {
            startEvent(this.player)
        }
        window.setInterval(this.save, 30000)
    },
})
    
app.mount('#app')

