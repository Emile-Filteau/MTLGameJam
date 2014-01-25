include("js/game/Friendly.js");
include("js/game/Hostile.js");
var NPC = Base.extend({
	constructor : function(width, height, posX, posY, sprite) {
		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.sprite = sprite;

	},
	
	draw : function(canvas, context) {
		
			context.fillStyle = '#FFFF00';
			context.fillRect(square.x, square.y, this.x, this.y);
		
	},

	update : function(framerate) {
		var rand = Math.random();
		if(rand > 0.5 && this.x < 700) {	//700 is arbitrary for testing
			this.x += 1;		
		}
		else if(this.x > 0){
			this.x -= 1;
		}
	}


});