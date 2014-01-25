include("js/game/Weapon.js");
var PlayerConstants = {
    idleImages : [],
    moveImages : [],
    jumpingImages : [],
    IDLE : 0,
    MOVE : 1
}
PlayerConstants['idleImages']['L'] = new Image();
PlayerConstants['idleImages']['L'].src = "./images/player/standbyLeft.png";

PlayerConstants['idleImages']['R'] = new Image();
PlayerConstants['idleImages']['R'].src = "./images/player/standbyRight.png";

PlayerConstants['jumpingImages']['L'] = new Image();
PlayerConstants['jumpingImages']['L'].src = "./images/player/jumpLeft.png";

PlayerConstants['jumpingImages']['R'] = new Image();
PlayerConstants['jumpingImages']['R'].src = "./images/player/jumpRight.png";

PlayerConstants['moveImages']['L'] = [];
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
PlayerConstants['moveImages']['L'].push(new Image());
for(i in PlayerConstants['moveImages']['L']) {
    PlayerConstants['moveImages']['L'][i].src = "./images/player/runLeft/run"+i+".png";
}
PlayerConstants['moveImages']['R'] = [];
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
PlayerConstants['moveImages']['R'].push(new Image());
for(i in PlayerConstants['moveImages']['R']) {
    PlayerConstants['moveImages']['R'][i].src = "./images/player/runRight/run"+i+".png";
}

var Player = Base.extend({
	constructor: function(posX, posY, spriteSrcL, spriteSrcR){

		this.height = 100;
		this.width = 120;
		this.x = posX;
		this.y = posY + this.height;
		this.hp = 100;
		this.sanity = 100;

		this.equippedWeapon = 0;
		this.primaryWeapon = 0;
		this.secondaryWeapon = 1;
		this.weapons = [,];
		this.axe = new Weapon(10, 1, 10, 80, 1, "slash", "");
		this.weapons[this.primaryWeapon] = this.axe;


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
		this.weapons[this.primaryWeapon].use();
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
		//console.log(this.x);
        if(this.onGround) {
            if(this.mouvement != "") {
                img = PlayerConstants['moveImages'][this.currentDirection][this.animationIndex];
            } else {
                img = PlayerConstants['idleImages'][this.currentDirection];
            }
        } else {
            img = PlayerConstants['jumpingImages'][this.currentDirection];
        }
        var offsetX = (this.mouvement == "" && this.currentDirection == "L") ? -20 : 0;

        if(this.x < camera.halfWidth) {
            context.drawImage(img, this.x - this.width/2 + offsetX, this.y - this.height/2);
        }
        else if(this.x > area.width - camera.halfWidth - this.width/2) {
            context.drawImage(img, this.x - area.width/2 + this.width/2 + offsetX, this.y - this.height/2);
            //context.drawImage(img, this.x - camera.width/2 + offsetX, this.y - this.height/2);
        }
        else {
            context.drawImage(img, camera.halfWidth - this.width/2 + offsetX, this.y - this.height/2);
        }

	},

	jump: function(){
		
		if(this.onGround){
	        this.velocityY = -22.0;
	        this.onGround = false;

	        if(this.currentDirection.indexOf("L") != -1 && this.velocityX != 0){
				this.velocityX = -2.0;
			}
				
			else if(this.currentDirection.indexOf("R") != -1 && this.velocityX != 0){
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
            if(this.x - this.width/2 <= 0)
                this.x = this.width/2;
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
                this.animationIndex++;
                if(this.animationIndex >= PlayerConstants['moveImages'][this.currentDirection].length) {
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