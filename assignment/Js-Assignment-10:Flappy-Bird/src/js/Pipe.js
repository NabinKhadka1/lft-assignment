const PIPE_WIDTH = 52;
const PIPE_HEIGHT = 320;
const MIN_HEIGHT = 65;
const GAP = 150;
var score =0;
let pipeContainer = document.querySelector('.pipe-container');
pipeContainer.style.position = 'relative';
pipeContainer.style.overflow = 'hidden';
pipeContainer.style.height = CONTAINER_HEIGHT + 'px';

function pixelate(value){
    return value + 'px';
}
class Pipe{
    constructor(offset=0){
        this.gap = GAP;
        this.x = -1;
        this.randomTopPosition = getRandomInt(MIN_HEIGHT,CONTAINER_HEIGHT-this.gap-MIN_HEIGHT)
        this.pipeTop = document.createElement('div');
        this.pipeBottom = document.createElement('div');
        this.offset = offset;

        this.createPipe();
    }
    createPipe(){
        this.pipeTop.style.position = 'absolute';
        this.pipeTop.style.width = pixelate(PIPE_WIDTH);
        this.pipeTop.style.height = pixelate(this.randomTopPosition);
        this.pipeTop.style.left = (CONTAINER_WIDTH + this.offset) + 'px';
        this.pipeTop.style.top = '0px';

        this.pipeTop.style.background = "url('../Js-Assignment-10:Flappy-Bird/src/images/pipe-green.png')";
        this.pipeTop.style.transform = 'rotate(180deg)'
        pipeContainer.appendChild(this.pipeTop);

        this.pipeBottom.style.position = 'absolute';
        this.pipeBottom.style.width = pixelate(PIPE_WIDTH);
        this.pipeBottom.style.height = (CONTAINER_HEIGHT - (this.randomTopPosition + this.gap)) + 'px';
        this.pipeBottom.style.left = (CONTAINER_WIDTH + this.offset) + 'px';
        this.pipeBottom.style.bottom = '0px';
        this.pipeBottom.style.background = "url('../Js-Assignment-10:Flappy-Bird/src/images/pipe-green.png')";
        pipeContainer.appendChild(this.pipeBottom);
    }
    checkCollision(){
        if
        (bird.x_position + bird.width >= parseInt(this.pipeTop.style.left)
        && bird.x_position <= (parseInt(this.pipeTop.style.left) + parseInt(this.pipeTop.style.width))
        && bird.y_position <= parseInt(this.pipeTop.style.top) + parseInt(this.pipeTop.style.height)
        
        ){
            collision = true;
        }

        if
        (bird.x_position + bird.width >= parseInt(this.pipeTop.style.left)
        && bird.x_position <= (parseInt(this.pipeTop.style.left) + parseInt(this.pipeTop.style.width))
        && bird.y_position + parseInt(bird.height)>= parseInt(this.pipeTop.style.top) + parseInt(this.pipeTop.style.height) + this.gap
        
        ){
            collision = true;
        }

    }
    movePipe(){
        this.checkCollision();
        if(!collision){
            this.pipeTop.style.left = (parseInt(this.pipeTop.style.left) + this.x) + 'px';
            this.pipeBottom.style.left =  (parseInt(this.pipeTop.style.left) + this.x) + 'px';
            if (parseInt(this.pipeTop.style.left) <= -50){
                this.randomTopPosition = getRandomInt(MIN_HEIGHT,CONTAINER_HEIGHT-this.gap-MIN_HEIGHT)
                this.pipeTop.style.height = pixelate(this.randomTopPosition);
                this.pipeBottom.style.height = (CONTAINER_HEIGHT - (this.randomTopPosition + this.gap)) + 'px';
    
                this.pipeTop.style.left = (CONTAINER_WIDTH) + 'px';
                this.pipeBottom.style.left = (CONTAINER_WIDTH) + 'px';
                score += 1;
                console.log(score);
                scoreInner.innerHTML = score;
            }
        } else{
            gameWrapper.classList.add('hidden');
            over.classList.remove('hidden');
            finalScore.innerText = score;
        }
    }
}
const pipe1 = new Pipe();
const pipe2 = new Pipe(200);


var random = null;
function playPipe(){
    pipe1.movePipe();
    pipe2.movePipe()
}
setInterval(playPipe,20);



