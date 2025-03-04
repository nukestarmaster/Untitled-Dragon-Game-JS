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
            button.click(player)
        },
        format: format,
        returnCounters: returnCounters,
        
    },
    beforeMount() {
        gameloop(player)
        startEvent(player)
    },
    updated() {
        console.log("update")
    },
})
    
app.mount('#app')

