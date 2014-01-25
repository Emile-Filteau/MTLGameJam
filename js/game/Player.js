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
		this.speed = 5.0;
		this.mouvement = "";
		this.gravity = 0.8;
		this.velocityX = 0.0;
		this.velocityY = 0.0;
		this.onGround = true;
		this.groundY = posY;
	},

	attack: function(){

	},

	draw: function(canvas, context){

		if(this.mouvement.indexOf("L") != -1){
			this.sprite = "./images/Barb_knight_small_L.png";
			this.background.src = this.sprite;
		}
		else if(this.mouvement.indexOf("R") != -1){
			this.sprite = "./images/Barb_knight_small_R.png";
			this.background.src = this.sprite;
		}

		context.drawImage(this.background, this.x, this.y);
	},

	jump: function(){
		
		if(this.onGround){
	        this.velocityY = -12.0;
	        this.onGround = false;
	    }
	},

	endJump: function(){
		
		if(this.velocityY < -6.0)
        	this.velocityY = -6.0;
	},

	interact: function(){
		console.log("PLAYER initiated Interaction.");
		

	},

	move: function(){
		if(this.mouvement.indexOf("L") != -1){
			this.x -= this.speed;
		}
			
		else if(this.mouvement.indexOf("R") != -1){
			this.x += this.speed;
		}
			
	},

	mouvementReplace: function(direction){
		this.mouvement = this.mouvement.replace(direction, "");
	},

	update: function(framerate){


		this.velocityY += this.gravity;        // Apply gravity to vertical velocity
	    this.x += this.velocityX;      // Apply horizontal velocity to X position
	    this.y += this.velocityY;  

	    if(this.y > this.groundY){
	        this.y = this.groundY;
	        this.velocityY = 0.0;
	        this.onGround = true;
	    }

	    this.move();
	}
});