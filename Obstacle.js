class Obstacle{

    constructor(posX, posY, width, height, color){
        this.posX  = posX
        this.posY  = posY
        this.width = width
        this.height = height
        this.color = color
        
        this.centerX = this.posX + (this.width/2)
        this.centerY = this.posY + (this.height/2)


        // console.log(this.color);
    }

    draw(){
        fill(this.color)
        // console.log(this.color);
        rect(this.posX, this.posY, this.width, this.height)
    }

}