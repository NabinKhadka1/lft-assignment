let carouselContainer = document.querySelector('.carousel-container');
let carouselImage = document.querySelector('.carousel-image-container');
let images = document.querySelectorAll('.carousel-image');
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let index=0;
images = [...images]
width = images[0].width;

carouselImage.style.transform = `translateX(-${width * index}px)`;

nextBtn.addEventListener('click',()=>{
    index++;
    carouselImage.style.transition = 'all 1s ease-in'
    carouselImage.style.transform = `translateX(-${width * index}px)`;
    if (index >= images.length-1){
        index=-1;
    }
})
prevBtn.addEventListener('click',()=>{
    index--;
    carouselImage.style.transition = 'all 1s ease-in-out'
    carouselImage.style.transform = `translateX(-${width * index}px)`;
    if (index <= 0){
        index=images.length;
    }
})


// Slider Navigator

circle_ids = ['circle-one','circle-two','circle-three']

images.forEach((circle,idx) =>{
    let spanElement = document.createElement('span');
    spanElement.classList.add('carousel-circle');
    spanElement.setAttribute('id',circle_ids[idx])
    carouselContainer.appendChild(spanElement);
})
const carouselCircle = document.querySelectorAll('.carousel-circle');
carouselCircle.forEach(element =>{
    element.style.position = 'absolute';
    element.style.width = '10px';
    element.style.height = '10px';
    element.style.borderRadius = '50%';
    element.style.background = 'rgb(207 223 190 / 20%)';
    element.style.cursor = 'pointer';
})


const circleOne = document.getElementById('circle-one');
circleOne.style.bottom = '10%';
circleOne.style.left = '44%';

const circleTwo = document.getElementById('circle-two');
circleTwo.style.bottom = '10%';
circleTwo.style.left = '47%';


const circleThree = document.getElementById('circle-three');
circleThree.style.bottom = '10%';
circleThree.style.left = '50%';

carouselCircle.forEach((elem,idx)=>{
    elem.addEventListener('click',(e)=>{
        index = idx;
        console.log(e);
        elem.classList.add('active');
        elem.style.transition = 'all 1s ease-in'
        carouselImage.style.transform = `translateX(-${width * index}px)`;
    })
})

function move(){
    console.log(index);
    if (index >= images.length-1){
        console.log(index)
        index=0;
    }
    index++;
    
    if (index != 0) {
        // carouselImage.style.transition = 'all 4s ease-in-out'
        carouselImage.style.transform = `translateX(-${width * index}px)`;
    }
}
setInterval(move,5000);


