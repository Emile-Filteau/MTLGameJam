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
		context.drawImage(this.backgound, 0, 0, canvas.width, canvas.height);
        context.drawImage(this.ground, 0, canvas.height - 195, 1920, 195);
	},

	jump: function(){

	},

	move: function(){

	},

	update: function(framerate){

	}
});