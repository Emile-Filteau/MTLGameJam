var Player = Base.extend({
	constructor: function(height, width, posX, posY, sprite){

		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.hp = 100;
		this.sanity = 100;
		this.equippedWeapon = 0;
		this.weapons = [,];
		this.sprite = sprite;

	},

	attack: function(){

	},

	draw: function(canvas, context){

		context.fillStyle = "#666";
		context.save();
		context.restore();
	},

	jump: function(){

	},

	move: function(){

	},

	update: function(framerate){

	}
});