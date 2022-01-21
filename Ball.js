class Ball {

    constructor(x, y, radius, color, name){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.name = name
        
        this.xspeed = 0.0
        this.yspeed = 0.0
        this.dt=0.1
        this.friction = 0.993

        console.log(`Created a Ball object with name ${this.name}, (x,y) = (${this.x}, ${this.y}), diameter of ${this.diameter}`);
    }

    update(){
        this.x += this.xspeed*this.dt
        this.y += this.yspeed*this.dt
        
        this.xspeed *= this.friction
        this.yspeed *= this.friction


        if(this.x < 0 || this.x > canvasWidth){
            this.xspeed = -this.xspeed
        }
        if(this.y < 0 || this.y > canvasHeight){
            this.yspeed = -this.yspeed
        }


    }

    draw(){
        fill(this.color)
        circle(this.x, this.y, 2*this.radius)
    }


}