const gameContainer = document.getElementById('game-container');
gameContainer.style.position = 'relative';
gameContainer.style.width = CONTAINER_WIDTH + 'px';
gameContainer.style.height = CONTAINER_HEIGHT + 'px';
gameContainer.style.margin = '0 auto';
gameContainer.style.background = "url('../Js-Assignment-10:Flappy-Bird/src/images/background-day.png')";


const baseContainer = document.querySelector('.base-container');
baseContainer.style.position = 'relative';
baseContainer.style.width = CONTAINER_WIDTH + 'px';
baseContainer.style.height = BASE_HEIGHT + 'px';
baseContainer.style.margin = MARGIN_AUTO;
baseContainer.style.background = "url('../Js-Assignment-10:Flappy-Bird/src/images/base.png')";

class Bird{
    constructor(x_position,y_position,width,height){
        this.x_position = x_position;
        this.y_position = y_position;
        this.width = width;
        this.height = height;
        this.element = document.createElement('div');
        this.create();
    }
    create(){
        this.element.style.position = 'absolute';
        this.element.style.left = this.x_position + 'px';
        this.element.style.top = this.y_position + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.background = "url('../Js-Assignment-10:Flappy-Bird/src/images/bluebird-downflap.png')";
        gameContainer.appendChild(this.element);
    }
    moveUp(){
        if (this.y_position >= 0){
            value =  50;
            this.y_position = this.y_position - value;
            this.element.style.top =  this.y_position + 'px';
            value = 0;
        }
        cancelAnimationFrame(animation);
    
    }
    moveDown(){
        if (this.y_position >= CONTAINER_HEIGHT- 30){ 
            cancelAnimationFrame(animation);
            value =0;
        } else{
            value =  value + 0.2;
            this.y_position = this.y_position + value
            this.element.style.top =  this.y_position + 'px';
        }
    }
}
const bird = new Bird(50,200,34,24)
var animation = null;
function playDown(){
    animation = window.requestAnimationFrame(()=>{
        playDown()
    })
    bird.moveDown();
}
document.addEventListener('keydown',(e)=>{
    if(e.code === 'Space'){
        bird.moveUp();
        playDown();
    }
})



