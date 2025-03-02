import { player, returnCounters } from "./src/player.js";
import { gameloop } from "./src/gameloop.js"
import { format } from "./src/format.js"

const app = Vue.createApp({
    el: "#app",
    data() {
        return {
            player: player,
        }
    },
    methods: {
        click: function click(button) {
            button.click(player)
        },
        format: format,
        returnCounters: returnCounters
    },
    beforeMount() {
        gameloop(player)
        player.events.start1.call(player)
    }
})
    
app.mount('#app')

