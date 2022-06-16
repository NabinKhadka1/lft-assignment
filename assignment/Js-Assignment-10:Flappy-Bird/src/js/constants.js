const CONTAINER_WIDTH    = 400;
const CONTAINER_HEIGHT = 524;
const BASE_HEIGHT = 112;
const MARGIN_AUTO = '0 auto'
let value = 0;
let velocity = 0.5
const body = document.querySelector('body');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
const start = document.querySelector('.start');
const gameWrapper = document.querySelector('.game-wrapper');
document.addEventListener('click', (e)=>{
    start.remove();
    gameWrapper.classList.remove('hidden');

})