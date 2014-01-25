var PlayerContants = {
    idleImages : [],
    moveImages : [],
    jumpImages : [],
    IDLE : 0,
    MOVE : 1
}
PlayerContants['idleImages']['L'] = new Image();
PlayerContants['idleImages']['L'].src = "./images/player/standbyLeft.png";

PlayerContants['idleImages']['R'] = new Image();
PlayerContants['idleImages']['R'].src = "./images/player/standbyRight.png";

PlayerContants['jumpImages']['L'] = new Image();
PlayerContants['jumpImages']['L'].src = "./images/player/jumpLeft.png";

PlayerContants['jumpImages']['R'] = new Image();
PlayerContants['jumpImages']['R'].src = "./images/player/jumpRight.png";

PlayerContants['moveImages']['L'] = [];
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
PlayerContants['moveImages']['L'].push(new Image());
for(i in PlayerContants['moveImages']['L']) {
    PlayerContants['moveImages']['L'][i].src = "./images/player/runLeft/run"+i+".png";
}
PlayerContants['moveImages']['R'] = [];
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
PlayerContants['moveImages']['R'].push(new Image());
for(i in PlayerContants['moveImages']['R']) {
    PlayerContants['moveImages']['R'][i].src = "./images/player/runRight/run"+i+".png";
}

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
		this.collidingObject = false;

        this.animationIndex = 0;
        this.animation = 0;
	},

	attack: function(){

	},
	collidesWith : function(collidingObject){
		if(collidingObject){
			//console.log (collidingObject);
			this.collidingObject = collidingObject;
			return this.collidingObject;
		}
		else{
			this.collidingObject = false;
			return false;
		}		

	},
	draw: function(canvas, context, camera, area){
        var img;
        if(this.onGround) {
            if(this.mouvement != "") {
                img = PlayerContants['moveImages'][this.currentDirection][this.animationIndex];
            } else {
                img = PlayerContants['idleImages'][this.currentDirection];
            }
        } else {
            img = PlayerContants['jumpImages'][this.currentDirection];
        }

        if(this.x < camera.halfWidth + camera.width* 0.25) {
            //console.log("Cas 1");
            context.drawImage(img, this.x, this.y);
        }
        else if(this.x > area.width - (camera.width * 0.75)) {
            //console.log("Cas 3");
            context.drawImage(img, camera.width - (area.width - this.x), this.y);
        }
        else {
           // console.log("Cas 2");
            var relX = 0;
            if(this.x <= camera.position.x - camera.width * 0.25) {
              //  console.log("2.1");
                relX = camera.halfWidth - (camera.width * 0.25);
            }
            else if(this.x >= camera.position.x + camera.width * 0.25) {
             //   console.log("2.2");
                relX = camera.halfWidth + (camera.width * 0.25);
            }
            else {
          //      console.log("2.3");
                relX = camera.halfWidth + (this.x - camera.position.x);
            }

            context.drawImage(img, relX, this.y);
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
		if(this.collidingObject){
			console.log("PLAYER is interacting near WorldObject '"+this.collidingObject+"'");
		}

	},
	move: function(area){
		if(this.mouvement.indexOf("L") != -1){
			this.x -= this.speed;
            if(this.x <= 0)
                this.x = 0;
			this.currentDirection = "L";
		}
			
		else if(this.mouvement.indexOf("R") != -1){
			this.x += this.speed;
            if(this.x >= area.width)
                this.x = area.width;
			this.currentDirection = "R";
		}
			
	},

	mouvementReplace: function(direction){
		this.mouvement = this.mouvement.replace(direction, "");
	},

	update: function(framerate, area){

        if(this.mouvement != "") {
            this.animation += framerate;
            if(this.animation >= 100) {
                console.log("tick");
                this.animationIndex++;
                if(this.animationIndex >= PlayerContants['moveImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }
        }

		this.velocityY += this.gravity;        // Apply gravity to vertical velocity
	    this.x += this.velocityX;      // Apply horizontal velocity to X position
	    this.y += this.velocityY;  

	    if(this.y > this.groundY){
	        this.y = this.groundY;
	        this.velocityX = 0.0;
	        this.velocityY = 0.0;
	        this.onGround = true;
	    }

	    this.move(area);
	}
});