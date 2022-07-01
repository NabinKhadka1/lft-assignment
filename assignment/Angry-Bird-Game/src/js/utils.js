var utils = {};
utils.mousePosition = (element) => {
    var mousePos = { x: 0, y: 0, event: null };
    element.addEventListener('mousemove', (event)=> {
        var x,y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mousePos.x = x;
        mousePos.y = y;
        mousePos.event = event;
    });
    return mousePos;
};