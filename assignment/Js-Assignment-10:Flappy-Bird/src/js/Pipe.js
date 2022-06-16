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
    movePipe(){
        this.pipeTop.style.left = (parseInt(this.pipeTop.style.left) + this.x) + 'px';
        this.pipeBottom.style.left =  (parseInt(this.pipeTop.style.left) + this.x) + 'px';
        if (parseInt(this.pipeTop.style.left) <= -50){
            this.randomTopPosition = getRandomInt(MIN_HEIGHT,CONTAINER_HEIGHT-this.gap-MIN_HEIGHT)
            this.pipeTop.style.height = pixelate(this.randomTopPosition);
            this.pipeBottom.style.height = (CONTAINER_HEIGHT - (this.randomTopPosition + this.gap)) + 'px';

            this.pipeTop.style.left = (CONTAINER_WIDTH) + 'px';
            this.pipeBottom.style.left = (CONTAINER_WIDTH) + 'px';
            score += 1;

        }
    }
}
const pipe1 = new Pipe();
const pipe2 = new Pipe(200);
const bird1 = new Bird()

function generatePipe(pipe1,pipe2){
    pipe1top={
        x: parseInt(pipe1.pipeTop.style.left),
        y: 0,
        width: PIPE_WIDTH,
        height: pipe1.randomTopPosition
    };
    pipe1bottom={
        x: parseInt(pipe1.pipeTop.style.left),
        y: CONTAINER_HEIGHT - parseInt(pipe1.pipeBottom.style.height),
        width: PIPE_WIDTH,
        height: CONTAINER_HEIGHT - pipe1.randomTopPosition - GAP
    };
    pipe2top={
        x: parseInt(pipe2.pipeTop.style.left),
        y: 0,
        width: PIPE_WIDTH,
        height: pipe2.randomTopPosition
    };
    pipe2bottom={
        x: parseInt(pipe2.pipeTop.style.left),
        y: CONTAINER_HEIGHT - parseInt(pipe2.pipeBottom.style.height),
        width: PIPE_WIDTH,
        height: CONTAINER_HEIGHT - pipe2.randomTopPosition - GAP
    };
    pipes = [pipe1top,pipe1bottom,pipe2top,pipe2bottom]
    return pipes
}
function checkCollision(pipe1,pipe2,bird1){
    let idx = 0;
    
    setInterval(()=>{
        pipeObject = generatePipe(pipe1,pipe2);
        pipe = pipeObject[idx];

        if (
            bird1.x + bird1.width <= pipe.x &&
            bird1.x <= pipe.x + pipe.width &&
            bird1.y_position + bird1.height >= pipe.y &&
            bird1.y_position <= pipe.y + pipe.height
        ){
            alert('hello  collision detected')
            bird1.collision = true;
        }
        idx += 1;
        if (idx == 4){
            idx = 0;
        }
    }, 1000/60);
}
checkCollision(pipe1,pipe2,bird1)


var random = null;
function playPipe(){
    pipe1.movePipe();
    pipe2.movePipe()
}
setInterval(playPipe,20);


