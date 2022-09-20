const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem
        this.reset()
    }
    get x(){
        // Takes the css variable --x and parses it into a js number that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'))
    }
    set x(value){
        this.ballElem.style.setProperty('--x', value)
    }
    get y(){
        // Takes the css variable --y and parses it into a js number that we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'))}
    set y(value){
        this.ballElem.style.setProperty('--y', value)
    }
    
    rect(){
        return this.ballElem.getBoundingClientRect()
    }
    
    reset(){
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while(
            Math.abs(this.direction.x) <= 0.2 || 
            Math.abs(this.direction.x) >= 0.9
            ){
            const heading = randomNumberBetween(0,2 * Math.PI) // Find a random number between 0 and 2*Pi and put into the heading variable
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) } // Convert the random number into an x (cosine) and y (sine) position
        }
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRects){
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

        if(rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1
        }
        if(paddleRects.some(r => isCollision(r, rect))){
            this.direction.x *= -1
        }
    }
}

function randomNumberBetween(min,max){
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2){
    return rect1.left <= rect2.right && 
    rect1.right >= rect2.left && 
    rect1.top <= rect2.bottom && 
    rect1.bottom >= rect2.top
}