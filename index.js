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
        saveData: function saveData() {
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
        },
        reincarnate: function reincarnate() {
            localStorage.setItem("player", JSON.stringify(this.player.reincarnate()))
            location.reload()
        },
        command: function command() {
            let input = prompt("Please enter command and args.")
            console.log(input)
            this.player.devCommand(input)
        }
    },
    beforeMount() {
        this.player.app = this
        this.player.init()
        let loaded = false
        try {
            loaded = this.load()
        } catch(err) {
            console.log(err)
        }
        
        gameloop(this.player)
        if (!loaded) {
            startEvent(this.player)
        }
        window.setInterval(this.saveData, 30000)
    },
})
    
app.mount('#app')