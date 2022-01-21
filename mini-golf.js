let canvasWidth = 450
let canvasHeight = 600

let ballRadius = 8.5
let holeRadius = 12.5

let ballColor = (255,255,255)
let holeColor = (127,127,127)

let ballStartX = canvasWidth/2
let ballStartY = canvasHeight/2

let holeStartX = canvasWidth/2
let holeStartY = canvasHeight/10

let holeTolerance = 8 // tolerance whether we were close enough to the hole or not

let newX = 0
let newY = 0

let ball = {}

function setup() {
    console.log("setup");

    angleMode(DEGREES)
    console.log("Angle mode = degrees");

    createCanvas(canvasWidth, canvasHeight)
    background(0, 200, 0)

    ball = new Ball (ballStartX,ballStartY , ballRadius, ballColor, "ball")
    hole = new Ball (holeStartX, holeStartY, holeRadius, holeColor, "hole")

}

function draw() {

    // console.log(`${mouseX}, ${mouseY}`);
    
    //draw field
    createCanvas(canvasWidth, canvasHeight)
    background(0, 200, 0)
    
    // draw hole
    fill(0)
    hole.update()
    hole.draw()

    // draw ball
    ball.update()
    ball.draw()
    getUserAction(ball.x, ball.y)

    if (isCollision(ball,hole)){
        ball.x = ballStartX
        ball.y = ballStartY
        ball.xspeed = 0.0
        ball.yspeed = 0.0
    }
   
}

function getUserAction(x, y){
    // if (mouseIsPressed){
    fill(0)
    strokeWeight(2.5)
 
    // Fixed-size circle and arrow
    // theta = atan2(mouseY-y, x-mouseX)
    // newX = x + cos(theta)*50
    // newY = y - sin(theta)*50
    
    // if (theta <0){
    //     theta = 360 + theta
    // }

    // // console.log(`theta=${theta}`)

    // noFill()
    // circle(x, y, 100)
    // line(x, y, newX, newY)
    // line(newX, newY, newX-20*cos(theta-30), newY+20*sin(theta-30))
    // line(newX, newY, newX-20*cos(-theta-30), newY-20*sin(-theta-30))
    
    

    /************************************************* */

    // arrow size defined by mouse
    oldX = newX
    oldY = newY

    newX = x-(mouseX-x)*0.5
    newY = y-(mouseY-y)*0.5

    size_a = x-newX
    size_b = y-newY

    if(sqrt(size_a*size_a + size_b*size_b)>50){
        theta = -atan2(mouseY-y, mouseX-x)        
        newX = x - cos(theta)*50
        newY = y + sin(theta)*50
    }
    
    if(mouseIsPressed && isMouseInsideCanvas()){
        line(x, y, newX, newY)

        deltaX = newX-x
        deltaY = newY-y

        theta = -atan2(newY-y, newX-x)
        if (theta <0){
            theta = 360 + theta
        }
        // console.log(`theta=${theta}`)
        line(newX, newY, newX-20*cos(theta-30), newY+20*sin(theta-30))
        line(newX, newY, newX-20*cos(-theta-30), newY-20*sin(-theta-30))

    }    
}

function mouseReleased(){
    if (isMouseInsideCanvas()){
        ball.xspeed = deltaX
        ball.yspeed = deltaY
    }
    // console.log(`xspeed = ${ball.xspeed}`);
    // console.log(`yspeed = ${ball.yspeed}`);
}

function isCollision(ball, hole){
    dist_X = ball.x - hole.x
    dist_Y = ball.y - hole.y
    let dist_ = +0.0
    dist_ = sqrt(dist_X*dist_X + dist_Y*dist_Y)
    if(dist_ <= (ball.radius + holeTolerance)){       
        return true
    }else{
        return false
    }
}

function isMouseInsideCanvas(){
    return (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight)
}