let imageURL = ['./src/image/bg.png','./src/image/base.png','./src/image/ground.png','./src/image/catapult1.png','./src/image/catapult3.png','./src/image/wood1.png','./src/image/wood1.png','./src/image/wood1.png','./src/image/pig.png']
let images = [];
let counter = 0;
let isMouseDown = false;
let isMouseUp = false;
let gravity = 0.4;
let speed = 0.5;
t = 0.5;
let velocity_x = 0;
let velocity_y = 0;
var birdPulledBack = false;
var birdReleased = false;



function startDrawingImage() {
    context.drawImage(images[0],0,0,canvas.width,canvas.height);
    context.drawImage(images[1],0,canvas.height-baseHeight,canvas.width,canvas.height);
    context.drawImage(images[2],0,canvas.height-groundHeight-baseHeight,groundWidth,groundHeight);
    context.drawImage(images[3],groundWidth-80,canvas.height-groundHeight-baseHeight-catapult1Height-20,catapult1Width,catapult1Height-30);
    context.drawImage(images[4],groundWidth-50,canvas.height-groundHeight-baseHeight-catapult1Height,catapult1Width,catapult1Height);
    context.drawImage(images[5],canvas.width-250,canvas.height-110,woodWidth,woodHeight);
    context.drawImage(images[6],canvas.width-100,canvas.height-110,woodWidth,woodHeight);
    context.drawImage(images[7],canvas.width-230,canvas.height-110-18,woodBaseWidth,woodBaseHeight);
    context.drawImage(images[8],canvas.width-168,canvas.height-110-18-75,pigWidth,pigHeight);
}

imageURL.forEach(src => {
    let image = new Image();
    image.src = src;
    image.onload = ()=> {
        counter += 1;
        if (counter === imageURL.length) {
            startDrawingImage();
        }
    }
    images.push(image);
    
});

function mousePosition(canvas,event) {
    var rectangle = canvas.getBoundingClientRect();
    return {x:event.clientX - rectangle.left, y:event.clientY - rectangle.top}
}
var bird = new Bird(125,130,'./src/image/bird.png');
window.onload = function () {
    // mousePos = utils.mousePosition(canvas);
    canvas.addEventListener('mousedown', function (event) {
        mousePos = mousePosition(canvas,event);
        
        if (isBirdInBoundary(mousePos)) {
            isMouseDown = true;
            isMouseUp = false;
            birdPulledBack = true;
            birdReleased = false;
            oldX = bird.x;
            oldY = bird.y;
            canvas.addEventListener('mouseup',onMouseUp);
            canvas.addEventListener('mousemove',onMouseMove);
        }
    })
    
    
    function onMouseUp(event) {
        mousePos = mousePosition(canvas,event);
        isMouseDown = false;
        isMouseUp = true;
        
        mouse_x = mousePos.x;
        mouse_y = mousePos.y;
        difference = distance(mouse_x,mouse_y,bird.x,bird.y);
        if ( difference <= 150 ) {
            var dx = mouse_x - bird.x;
            var dy = bird.y - mouse_y;
            var angle = Math.atan2(dy,dx) ;
            var vx = 100 * Math.cos(angle);
            var vy = 100 * Math.sin(angle);
            bird.x += vx  ;
            bird.y -= vy  ;
        }
        canvas.removeEventListener('mouseup',onMouseUp);
        canvas.removeEventListener('mousemove',onMouseMove);
    }
    function onMouseMove(event) {
        //Translate bird to mouse position
        mousePos = mousePosition(canvas,event);
        // console.log("Mouse move ",mousePos)
            bird.x0 = oldX - mousePos.x;
            bird.y0 = oldY - mousePos.y;
            bird.draw(context);
        }
        
    }

    function distance(x0,y0,x1,y1) {
        return Math.sqrt(Math.pow((x1-x0),2) + Math.pow((y1-y0),2));
    }
    function isBirdInBoundary(mousePos) {
        if (mousePos.x >= bird.x && mousePos.x <= bird.x + birdWidth && mousePos.y >= bird.y && mousePos.y <= bird.y + birdHeight) return true;
        else return false;
    }

    function isBirdPulledBack() {
        if (isMouseDown) {
            birdPulledBack = true;
            birdReleased = false;
        }
        else if (isMouseUp) {
            birdPulledBack = false;
            birdReleased = true;
            if (birdReleased) {
                mouse_x = mousePos.x;
                mouse_y = mousePos.y;
                difference = Math.min(150,distance(mouse_x,mouse_y,bird.x,bird.y));
                // console.log('birdx: ',bird.x,'birdy: ',bird.y,'MouseX: ',mouse_x,'MouseY: ',mouse_y)
                var dx = mouse_x - bird.x;
                var dy = bird.y - mouse_y;
                // console.log("Dy:",dx,"dy: ",dy)
                var angle = Math.atan2(dy,dx) * 180/Math.PI;
                // var angle = 45;
                console.log(angle);
                // vx = speed * Math.cos(angle);
                // vy = speed * Math.sin(angle);
                // vx = speed * Math.cos(angle) * t + velocity_x;
                vx = 2*Math.sin(angle);
                vy = 1.2 * gravity * t * t + speed * Math.sin(angle) * t + velocity_y;
                console.log(vx,vy);
                bird.x += vx  ;
                bird.y += vy  ;
            }
        }
    }

    function drawFrame() {
        context.clearRect(0,0,canvas.width,canvas.height);
        counter =0;
        startDrawingImage();
        isBirdPulledBack();
        bird.draw(context);
        requestAnimationFrame(drawFrame,canvas);
    };
    drawFrame();
    
   







