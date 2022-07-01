class Bird {
    constructor(x,y,src,x0=10,y0=20) {
        this.x = x;
        this.y = y;
        this.width = birdWidth;
        this.height = birdHeight;
        this.image = new Image();
        this.image.src = src;
        this.x0 = x0;
        this.y0 = y0;
    }
    draw(context,angle=0) {
        context.save();
        context.translate(this.x0,this.y0);
        context.rotate(angle)
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
        context.restore();
    }
    
}