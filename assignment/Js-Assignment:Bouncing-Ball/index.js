const CONTAINER_WIDTH = 600;
const CONTAINER_HEIGHT = 500;
const CONTAINER_BORDER = '1px solid black';
const CONTAINER_MARGIN = '100px auto';
const BORDER_RADIUS = '50%'



const body = document.querySelector('body');
body.style.position = 'relative';
body.style.width = pixelate(CONTAINER_WIDTH);
body.style.height = pixelate(CONTAINER_HEIGHT);
body.style.border = CONTAINER_BORDER;
body.style.margin = CONTAINER_MARGIN;

function pixelate(value){
    return `${value}px`
}

class Ball{
    constructor(width,height,x,y,sx,sy,dx,dy,color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.dx = dx;
        this.dy = dy;
        this.color = color
        this.element = document.createElement('div');
        this.create();
    }
    
    create(){
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.borderRadius = `${BORDER_RADIUS}`;
        this.element.style.background = `${this.color}`;
        this.element.style.top = `${this.x}px`;
        this.element.style.left = `${this.y}px`;
        body.appendChild(this.element);
    }
    
    move(){
        this.x = this.x + this.sx * this.dx;
        this.y = this.y + this.sy * this.dy;
        this.element.style.left = pixelate(this.x);
        this.element.style.top = pixelate(this.y);
    }
    checkWallCollision(){
        if (this.x >= CONTAINER_WIDTH-this.width){
            this.dx = -1
        }
        if (this.y >= CONTAINER_HEIGHT-this.height){
            this.dy = -1
        }
        if(this.x <= 0){
            this.dx = 1
        }
        if(this.y <= 0){
            this.dy = 1
        }
    }
    checkBallCollision(i_index,ball_arr){
        ball_arr.forEach((ballToCompare,j_index)=>{
            if (i_index==j_index) return;
            let dist_x = Math.pow((this.x - ballToCompare.x),2)
            let dist_y = Math.pow((this.y - ballToCompare.y),2)

            let distance = Math.sqrt(dist_x + dist_y)
            if(distance - this.width <=0){
                this.dx = -this.dx;
                this.dy = -this.dy;
            }
        })
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const ball_count = getRandomInt(5,20);
const ball_arr = [];

for (let i=0; i<ball_count; i++){
    const rad = getRandomInt(10,20);    //Radius of ball
    const x = getRandomInt(rad,CONTAINER_WIDTH- Math.floor(rad/2)); //Random x position
    const y = getRandomInt(rad,CONTAINER_HEIGHT-Math.floor(rad/2)); //Random y position

    const sx = getRandomInt(2,4);   // Speed x direction
    const sy = getRandomInt(2,4);      //Speed y direction
    console.log(sx,sy)
    const dx = Math.random() > 0.5 ? 1:-1;  //Direction
    const dy = Math.random() > 0.5 ? 1:-1;

    const color = `rgb(${getRandomInt(0,256)},${getRandomInt(0,256)},${getRandomInt(0,256)})`;

    ball_arr.push(new Ball(rad*2,rad*2,x,y,sx,sy,dx,dy,color));
}

let ball = new Ball();
function play(){
    ball_arr.forEach((ball,idx)=>{
        ball.move();
        ball.checkWallCollision(); //Checks collision with the wall
        ball.checkBallCollision(idx,ball_arr);  //Checks collision with each ball
    })
    requestAnimationFrame(()=>{
        play();
    })
}
play();

