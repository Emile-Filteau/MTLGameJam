var ExampleGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight);
		
		this.squares = [];
		this.randyCounter = 0;
		this.randyThreshold = 2000;

	},
	
	draw : function(canvas, context) {
		context.fillStyle = "#666";
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		
		for(i in this.squares) {
			square = this.squares[i];
			context.save();
			context.fillStyle = '#FFFF00';
			context.fillRect(square.x, square.y, 10, 10);
			context.restore();
		}
	},

	update : function(framerate) {
		this.randyCounter += framerate;
		if(this.squares.length < 20) {
			if(this.randyCounter >= this.randyThreshold) {
				var rand = Math.random();
				if(rand > 0.5) {
					this.squares.push({x:Math.random()*400, y:Math.random()*400});		
				}
				this.randyCounter=0;
			}
		}
	},
	
	clearSquares : function() {
		this.squares = [];
	}
	
});