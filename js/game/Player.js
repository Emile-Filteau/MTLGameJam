include("js/game/Weapon.js");
var PlayerConstants = {
    idleImages : [],
    moveImages : [],
    attackImages : [],
    IDLE : 0,
    MOVE : 1
}
PlayerConstants['idleImages']['L'] = new Image();
PlayerConstants['idleImages']['L'].src = "./images/player/standbyLeft.png";

PlayerConstants['idleImages']['R'] = new Image();
PlayerConstants['idleImages']['R'].src = "./images/player/standbyRight.png";

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


//Weapon images ------------------------------------------------------------------------------------------
PlayerConstants['attackImages']['L'] = [];
PlayerConstants['attackImages']['L'].push(new Image());
PlayerConstants['attackImages']['L'].push(new Image());

for(i in PlayerConstants['attackImages']['L']) {
    PlayerConstants['attackImages']['L'][i].src = "./images/player/attackLeft/attack"+i+".png";
}

PlayerConstants['attackImages']['R'] = [];
PlayerConstants['attackImages']['R'].push(new Image());
PlayerConstants['attackImages']['R'].push(new Image());


for(i in PlayerConstants['attackImages']['R']) {
    PlayerConstants['attackImages']['R'][i].src = "./images/player/attackRight/attack"+i+".png";
}

var Player = Base.extend({
	constructor: function(posX, posY, spriteSrcL, spriteSrcR){

		this.height = 100;
		this.width = 80;
		this.x = posX;
		this.y = posY + this.height;
		this.hp = 100;
		this.sanity = 100;

		this.equippedWeapon = 0;
		this.primaryWeapon = 0;
		this.secondaryWeapon = 1;
		this.weapons = [,];

		//damage, attackSpeed, reach, sanityThreshold, cooldown, typeAttack, sprites
		this.axe = new Weapon(10, 2.7, 10, 80, 1, "slash", "");

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
        this.attacking = false;
        this.animationAttackingIndex = 0;
        this.animationAttacking = 0;
	},

	attack: function(){
		this.attacking = true;
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

        if(this.attacking){       	
        	img = PlayerConstants['attackImages'][this.currentDirection][this.animationAttackingIndex];
        }
        else {
        	if(this.mouvement != "") {
            img = PlayerConstants['moveImages'][this.currentDirection][this.animationIndex];
	        } else {
	            img = PlayerConstants['idleImages'][this.currentDirection];
	        }
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
        
        if(this.attacking){
        	this.animationAttacking += framerate;
        	if(this.animationAttacking >= this.weapons[this.equippedWeapon].attackSpeed * 100){
        		this.animationAttackingIndex++;
        		if(this.animationAttackingIndex >= PlayerConstants['attackImages'][this.currentDirection].length) {
                    this.animationAttackingIndex=0;
                    this.attacking = false
                }
                this.animationAttacking = 0;           
        	}
        }
        else if(this.mouvement != "") {
            this.animation += framerate;
            if(this.animation >= 100) {

                this.animationIndex++;
                if(this.animationIndex >= PlayerConstants['moveImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }
        }

        //Jump *************************
		this.velocityY += this.gravity;        
	    this.x += this.velocityX;    
	    this.y += this.velocityY;  

	    if(this.y > this.groundY){
	        this.y = this.groundY;
	        this.velocityX = 0.0;
	        this.velocityY = 0.0;
	        this.onGround = true;
	    }
	    //******************************

	    this.move(area);
	}
});