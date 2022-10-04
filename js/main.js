// Update Loop
import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScoreElem = document.getElementById('player-score')
const computerScoreElem = document.getElementById('computer-score')

// By passing time through the update function, the code will loop forever and therefore always update the screen
let lastTime
function update(time){
    if(lastTime != null){
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))

        document.documentElement.style.setProperty('--hue', hue + delta * -0.01)

        if(isLose()){
            handleLose()
        }
    }
    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerHeight || rect.left <= 0
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }else{
        // computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
        //ISSUE: computer score continuously climbs up and ball stays in the middle//
    }
    ball.reset()
    computerPaddle.reset()
}

window.requestAnimationFrame(update)

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})