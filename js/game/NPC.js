include("js/game/Friendly.js");
include("js/game/Hostile.js");
var NPC = Base.extend({
	constructor : function(width, height, posX, posY, sprite) {
		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.sprite = sprite;


        this.frameCounter = 0;
	},
	
	draw : function(canvas, context) {
		
			context.fillStyle = '#FFFF00';
			context.fillRect(square.x, square.y, this.x, this.y);
		
	},

	update : function(framerate) {
        this.frameCounter += framerate;
        console.log(framerate);
        if(this.frameCounter >= 10) {
            var rand = Math.random();
            if(rand > 0.1 ){
                rand = Math.random();
                if( rand > 0.5 && this.x < 900) {	//900 is arbitrary for testing
                    this.x += 1;
                    //console.log("Friendly move RIGHT");
                }
                else if(this.x > 0){
                    this.x -= 1;
                    //console.log("Friendly move LEFT");
                }
            }
            this.frameCounter = 0;
        }
	}


});