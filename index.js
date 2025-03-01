import { player } from "./src/player.js";
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
    },
    beforeMount() {
        gameloop(player)
    }
})
    
app.mount('#app')

