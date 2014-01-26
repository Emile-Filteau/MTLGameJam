include("js/game/NPC.js");
include("js/game/Spitter.js")


var Hostile = NPC.extend({
	
constructor : function(posX, posY) {
		this.base(posX, posY);
		this.height = 140;
		this.width = 110;
		this.x = posX;
		this.y = posY - this.height/2 - 30;
        this.currentDirection = "L";
        this.moving = true;
        this.speed = 4;
        this.attackReach = 40;

        this.animationAttackingIndex = 0;
        this.animationIndex = 0;
        this.animation = 0;
	},
	
	draw : function(canvas, context, player, camera, area) {
       /* if(this.moving) {
            if(player.x < camera.halfWidth) {
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(BoommerConstants['moveImages'][this.currentDirection][this.animationIndex],
                	camera.halfWidth - playerDistance - this.width/2,
                	this.y);
            }

        }

        else if(this.attacking){
        	if(player.x < camera.halfWidth) {
        		console.log('atk1');
        		context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
        	}
        	else if(player.x > area.width - camera.halfWidth - player.width/2) {
        		console.log('atk2');
        		context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y-10);
            }
            else{
            	console.log('atk3');
            	var playerDistance = Math.abs(player.x - this.x);
        	context.drawImage(BoommerConstants['attackImages'][this.currentDirection][this.animationIndex],
        						camera.halfWidth - this.width/2 - 90,
        						this.y-10);
            }
        }*/

	},

	update : function(framerate, player) {

      /*  if(Math.abs((this.x - player.x)) < this.attackReach){
        	this.moving = false;
        	this.attacking = true;

        	console.log('attack!');
        	this.animation += framerate;
        	if(this.animation >= 250) {
                this.animationIndex++;
                if(this.animationIndex >= BoommerConstants['attackImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }

        }
        else{
        	this.attacking = false;
        	this.moving = true;
        	this.animationIndex = 0
        }

        if(this.moving) {
            this.animation += framerate;
            if(this.animation >= 250) {
                this.animationIndex++;
                if(this.animationIndex >= BoommerConstants['moveImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }
            if(this.x > player.x) {
                this.x -= this.speed;
                this.currentDirection = "L";
            } else {
                this.x += this.speed;
                this.currentDirection = "R";
            }
        }
        this.collide(player);
        */
	},
	collide : function(player){
		var colisionBool = this.base(player);
		console.log(colisionBool);
		if(colisionBool){
			if(player.recovery == 0){
				player.takeDamage(1);
			}
		}
		if(player.doDamage && this.y <= player.y){
			if(player.currentDirection.indexOf("L") != -1){
				//console.log((player.x - player.width/2) - player.weapons[player.equippedWeapon].reach + " " + (this.x + this.width/2));

				if((player.x - player.width/2 -  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2) && (player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2))
					player.weapons[player.equippedWeapon].doDamage(this);
			}		
				
			if(player.currentDirection.indexOf("R") != -1){
				//console.log((player.x + player.width/2) + " " + (player.weapons[player.equippedWeapon].reach + (player.x + player.width/2)) + " " + this.x + " " + (this.x - this.width/2));

				if((player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) >= (this.x - this.width/2) && (player.x + player.width/2 +  player.weapons[player.equippedWeapon].reach) <= (this.x + this.width/2))
					player.weapons[player.equippedWeapon].doDamage(this);					
			}
				
		}
	
	}

});