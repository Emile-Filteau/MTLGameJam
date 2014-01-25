var Player = Base.extend({
	constructor: function(width, height, posX, posY, spriteSrcL, spriteSrcR){

		this.height = height;
		this.width = width;
		this.x = posX;
		this.y = posY;
		this.hp = 100;
		this.sanity = 100;
		this.equippedWeapon = 0;
		this.weapons = [,];
		this.backgroundL = new Image();
		this.backgroundR = new Image();
		this.backgroundL.src = spriteSrcL;
		this.backgroundR.src = spriteSrcR;
		this.speed = 7.5;
		this.mouvement = "";
		this.gravity = 1.2;
		this.velocityX = 0.0;
		this.velocityY = 0.0;
		this.onGround = true;
		this.groundY = posY;
	},

	attack: function(){

	},

	draw: function(canvas, context){

		if(this.mouvement.indexOf("L") != -1){
			context.drawImage(this.backgroundL, this.x, this.y);
		}
		else if(this.mouvement.indexOf("R") != -1){
			context.drawImage(this.backgroundR, this.x, this.y);
		}		
	},

	jump: function(){
		
		if(this.onGround){
	        this.velocityY = -22.0;
	        this.onGround = false;

	        if(this.mouvement.indexOf("L") != -1){
				this.velocityX = -2.0;
			}
				
			else if(this.mouvement.indexOf("R") != -1){
				this.velocityX = 2.0;
			}
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
	        this.velocityX = 0.0;
	        this.velocityY = 0.0;
	        this.onGround = true;
	    }

	    this.move();
	}
});