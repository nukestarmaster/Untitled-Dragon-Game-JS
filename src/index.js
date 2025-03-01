import { player } from "./player.js";
import { gameloop } from "./gameloop.js"
import { format } from "./format.js"

const app = Vue.createApp({
    el: "#app",
    data() {
        return {
            player: player,
        }
    },
    methods: {
        click: function click(button, manager) {
            console.log(" ")
            console.log("clicking")
            button.click(manager)
        },
        format: format,
    },
    beforeMount() {
        gameloop(this, player.actionManager)
    }
})
    
app.mount('#app')

