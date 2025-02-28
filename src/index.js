import { player } from "./player.js";

const app = Vue.createApp({
    el: "#app",
    data() {
        return {player: player,}
        },
})

function click(button) {
    button.click()
}
    
app.mount('#app')

