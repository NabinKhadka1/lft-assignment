const mainContainer = document.getElementById('main-container');
const gameContainer = document.querySelector('.game-container');
const startInfo = document.querySelector('.start-info');
const score = document.querySelector('.score');

const position = {value:5,score:0};
const start = {};
arrows = {ArrowLeft:false,ArrowRight:false,ArrowUp:false,ArrowDown:false}


document.addEventListener('keydown',(e)=>{
    arrows[e.key] = true;
})
document.addEventListener('keyup',(e)=>{
    arrows[e.key] = false;
})
function collisionDetection(mycar,myenemy){
    const myCar = mycar.getBoundingClientRect();
    const myEnemy = myenemy.getBoundingClientRect();
    
    if (
        myCar.x + CAR_WIDTH >= myEnemy.x &&
        myCar.x <= myEnemy.x + CAR_WIDTH &&
        myCar.y + CAR_HEIGHT >= myEnemy.y &&
        myCar.y <= myEnemy.y + CAR_HEIGHT
    ){
        return true;
    }
}
function gameOver(){
    start.isTrue = false;
    startInfo.classList.remove('hidden');
    gameContainer.classList.add('hidden');
    startInfo.innerText = 'Game Over!'
}
function generateEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(singleEnemy =>{
        if(collisionDetection(car,singleEnemy)){
            gameOver();
        }
        if(singleEnemy.y >= 550) {
            singleEnemy.y = -300;
            singleEnemy.style.left = Math.floor(Math.random() * (CONTAINER_WIDTH - CAR_WIDTH)) + 'px';

        }
        singleEnemy.y += position.value;
        singleEnemy.style.top = singleEnemy.y + 'px';
    })
}

function play(){
    let car = document.querySelector('.car');
    let lane = gameContainer.getBoundingClientRect();
    if (start.isTrue){
        generateEnemy(car);
    
        position.x = car.offsetLeft;
        position.y = car.offsetTop;
    
        if(arrows.ArrowDown && position.y < (lane.bottom - CAR_HEIGHT)){
            position.y += position.value;
        } else if(arrows.ArrowUp && position.y > (lane.top + CAR_HEIGHT)){
            position.y -= position.value;
        } else if(arrows.ArrowLeft && position.x > 0 ){
            position.x -= position.value;
        } else if(arrows.ArrowRight && position.x < (lane.width - CAR_WIDTH)){
            position.x += position.value;
        }
    
        car.style.left = position.x + 'px';
        car.style.top = position.y + 'px';
        window.requestAnimationFrame(play);
        position.score++;
        score.innerText =`Score: ${position.score}` ;
    }
}
function startGame(e){
    gameContainer.classList.remove('hidden');
    startInfo.classList.add('hidden');

    let car = document.createElement('div');
    car.classList.add('car');
    gameContainer.appendChild(car);

    start.isTrue = true;

    for (let j=0; j<3; j++){
        let enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = ((j+1)*350) * -1;
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (CONTAINER_WIDTH - CAR_WIDTH)) + 'px';
        gameContainer.appendChild(enemy);
    }

    window.requestAnimationFrame(play);
    
}
startInfo.addEventListener('click',startGame);