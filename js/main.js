// Update Loop
import Ball from './ball.js'

const ball = new Ball(document.getElementById('ball'))

// By passing time through the update function, the code will loop forever and therefore always update the screen
let lastTime
function update(time){
    if(lastTime != null){
        const delta = time - lastTime
        ball.update(delta)
    }
    lastTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)