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
    },
    beforeMount() {
        gameloop(this.player)
        startEvent(this.player)
    },
})
    
app.mount('#app')

