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

        this.images = [];
        this.images["R"] = new Image();
        this.images["L"] = new Image();
        this.images["R"].src = spriteSrcR;
        this.images["L"].src = spriteSrcL;

		this.speed = 7.5;
		this.mouvement = "";
		this.currentDirection = "R";
		this.gravity = 1.4;
		this.velocityX = 0.0;
		this.velocityY = 0.0;
		this.onGround = true;
		this.groundY = posY;
	},

	attack: function(){

	},

	draw: function(canvas, context, camera, area){

        if(this.x < camera.halfWidth + camera.width* 0.25) {
            console.log("Cas 1");
            context.drawImage(this.images[this.currentDirection], this.x, this.y);
        }
        else if(this.x > area.width - (camera.width * 0.75)) {
            console.log("Cas 3");
            context.drawImage(this.images[this.currentDirection], camera.width - (area.width - this.x), this.y);
        }
        else {
            console.log("Cas 2");
            var relX = 0;
            if(this.x <= camera.position.x - camera.width * 0.25) {
                console.log("2.1");
                relX = camera.halfWidth - (camera.width * 0.25);
            }
            else if(this.x >= camera.position.x + camera.width * 0.25) {
                console.log("2.2");
                relX = camera.halfWidth + (camera.width * 0.25);
            }
            else {
                console.log("2.3");
                relX = camera.halfWidth + (this.x - camera.position.x);
            }

            context.drawImage(this.images[this.currentDirection], relX, this.y);
        }

	},

	jump: function(){
		
		if(this.onGround){
	        this.velocityY = -22.0;
	        this.onGround = false;

	        if(this.currentDirection.indexOf("L") != -1){
				this.velocityX = -2.0;
			}
				
			else if(this.currentDirection.indexOf("R") != -1){
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
			this.currentDirection = "L";
		}
			
		else if(this.mouvement.indexOf("R") != -1){
			this.x += this.speed;
			this.currentDirection = "R";
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