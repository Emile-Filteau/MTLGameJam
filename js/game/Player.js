var Player = Base.extend({
	constructor: function(width, height, posX, posY, spriteSrc){

		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.hp = 100;
		this.sanity = 100;
		this.equippedWeapon = 0;
		this.weapons = [,];
		this.background = new Image();
		this.background.src = spriteSrc;
		this.speed = 5;
		this.mouvement = "";

	},

	attack: function(){

	},

	draw: function(canvas, context){
		context.drawImage(this.background, this.x, this.y);
	},

	jump: function(){

	},

	move: function(){
		if(this.mouvement.indexOf("L") != -1){
			this.x -= this.speed;
		}
			
		else if(this.mouvement.indexOf("R") != -1){
			this.x += this.speed;
		}
			
	},

	/*moveLeft: function(){
		console.log("LEFT");
		this.x -= this.speed;
	},

	moveRight: function(){
		console.log("RIGHT");
		this.x += this.speed;
	},*/

	update: function(framerate){
		this.move();

	}
});