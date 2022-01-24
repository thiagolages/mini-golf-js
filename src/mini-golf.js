function setup() {
    console.log("setup");

    angleMode(DEGREES)
    console.log("Angle mode = degrees");

    createCanvas(canvasWidth, canvasHeight)
    background(0, 200, 0)

    ball = new Ball (ballStartX, ballStartY, ballRadius, ballColor, "ball")
    hole = new Ball (holeStartX, holeStartY, holeRadius, holeColor, "hole")

    obs1 = new Obstacle((ballStartX+holeStartX)/2-20, (ballStartY+holeStartY)/2+40, 30, 30, obstacleColor)

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

    // draw obstacle
    obs1.draw()

    checkSuccessfulShot(ball, hole)
    checkObstacleCollision(ball, obs1)
   
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
    if( mouseIsPressed && isLegalMousePress() && ball.isStill()){

        newX = x-(mouseX-initialMouseX)*arrowReductionRatio
        newY = y-(mouseY-initialMouseY)*arrowReductionRatio

        size_a = initialMouseX-mouseX
        size_b = initialMouseY-mouseY

        if(sqrt(size_a*size_a + size_b*size_b)>maxArrowSize){
            theta = -atan2(mouseY-initialMouseY, mouseX-initialMouseX)        
            newX = x - cos(theta)*maxArrowSize*arrowReductionRatio
            newY = y + sin(theta)*maxArrowSize*arrowReductionRatio
        }

        line(x, y, newX, newY)

        // lineRectIntersection(line, rectangle)
        // twoLinesIntersection(line1, line2)

        //  extend line so that we can see where it's going
        aux_lineX = newX +10
        aux_lineY = newY +10
        // while(  aux_lineX > 0 && aux_lineX < canvasWidth &&
        //         aux_lineY > 0 && aux_lineY < canvasHeight){
        //     line(newX,  newX, aux_lineX, aux_lineY)
        // }


        ballXSpeed = newX-x
        ballYSpeed = newY-y

        theta = -atan2(newY-y, newX-x)
        if (theta <0){
            theta = 360 + theta
        }
        // // console.log(`theta=${theta}`)
        line(newX, newY, newX-20*cos(theta-30), newY+20*sin(theta-30))
        line(newX, newY, newX-20*cos(-theta-30), newY-20*sin(-theta-30))

    }    
}

function mousePressed() {
    if (mouseButton === LEFT){
        initialMouseX = mouseX
        initialMouseY = mouseY
    }
}

function mouseReleased(){
    if (isLegalMousePress() && ball.isStill()){
        ball.xspeed = ballXSpeed
        ball.yspeed = ballYSpeed
    }
    // console.log(`xspeed = ${ball.xspeed}`);
    // console.log(`yspeed = ${ball.yspeed}`);
}


function checkObstacleCollision(ball, obstacle){

    /* RETORNAR AQUI */

    if (isBallObstacleCollision(ball, obstacle)){ // check if there is any collision
        // check which collision it was (horizontal or vertical)
        if (isHorizontalCollision(ball, obstacle)){ 
            console.log("HORIZONTAL COLLISION!");
            console.log(`ball.x, y = ${ball.x}, ${ball.y-ball.r}, obst.p1, p4 = (${obstacle.posX}, ${obstacle.posY}), (${obstacle.posX+obstacle.width}, ${obstacle.posY+obstacle.height})`);
            ball.xspeed = -ball.xspeed
        }
        if (isVerticalCollision(ball, obstacle)){ 
            console.log("VERTICAL COLLISION!");
            ball.yspeed = -ball.yspeed
        }
    }
}

function isBallObstacleCollision(ball, obst){
    return (isHorizontalCollision(ball, obst) && isVerticalCollision(ball, obst))
}

function isHorizontalCollision(ball, obst){
    if ((ball.x + ball.r) > obst.posX &&  (ball.x + ball.r) < (obst.posX + obst.width  + 2*ball.r) ){
        return true
    }else{
        return false
    } 
}

function isVerticalCollision(ball, obst){
    // console.log(`ball.x, y = ${ball.x}, ${ball.y}, obst.x, y = ${obst.posX}, ${obst.posY}`);
    if ((ball.y + ball.r) > obst.posY &&  (ball.y + ball.r) < (obst.posY + obst.height + 2*ball.r)){
        return true
    }else {
        return false
    }
}

function checkSuccessfulShot(ball, hole){
    
    if (isCircleCollision(ball,hole)){
            ball.x = ballStartX
            ball.y = ballStartY
            ball.xspeed = 0.0
            ball.yspeed = 0.0
        }

}

function isCircleCollision(ball, hole){

    dist_X = ball.x - hole.x
    dist_Y = ball.y - hole.y
    let dist_ = +0.0
    dist_ = sqrt(dist_X*dist_X + dist_Y*dist_Y)
    if(dist_ <= (ball.r + holeTolerance)){       
        return true
    }else{
        return false
    }
}

function isMouseInsideCanvas(){
    return (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < canvasHeight)
}

function isLegalMousePress(){
    return (mouseButton === LEFT && isMouseInsideCanvas())
}