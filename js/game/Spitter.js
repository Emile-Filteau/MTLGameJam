include("js/game/NPC.js");

var SpitterConstants = {
    idleImages : [],
    moveImages : [],
    attackImages : [],
    IDLE : 0,
    MOVE : 1
}
SpitterConstants['idleImages']['L'] = new Image();
SpitterConstants['idleImages']['L'].src = "./images/spitters/spitterStandingLeft.png";

SpitterConstants['idleImages']['R'] = new Image();
SpitterConstants['idleImages']['R'].src = "./images/spitters/spitterStandingRight.png";

SpitterConstants['moveImages']['L'] = [];
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
SpitterConstants['moveImages']['L'].push(new Image());
for(i in SpitterConstants['moveImages']['L']) {
    SpitterConstants['moveImages']['L'][i].src = "./images/spitters/runLeft/SpitterWalk"+i+".png";
}
SpitterConstants['moveImages']['R'] = [];
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
SpitterConstants['moveImages']['R'].push(new Image());
for(i in SpitterConstants['moveImages']['R']) {
    SpitterConstants['moveImages']['R'][i].src = "./images/spitters/runRight/SpitterWalk"+i+".png";
}
SpitterConstants['attackImages']['R'] = [];
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
SpitterConstants['attackImages']['R'].push(new Image());
for(i in SpitterConstants['attackImages']['R']) {
    SpitterConstants['attackImages']['R'][i].src = "./images/spitters/spitterAttackRight/spitterAttack"+i+".png";
}
SpitterConstants['attackImages']['L'] = [];
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
SpitterConstants['attackImages']['L'].push(new Image());
for(i in SpitterConstants['attackImages']['L']) {
    SpitterConstants['attackImages']['L'][i].src = "./images/spitters/spitterAttackLeft/spitterAttack"+i+".png";
}


var Spitter = NPC.extend({
	
constructor : function(posX, posY) {
		this.height = 140;
		this.width = 110;
		this.x = posX;
		this.y = posY - this.height/2 - 50;
        this.hp = 3;
        this.currentDirection = "L";
        this.moving = true;
        this.attacking = false;
        this.speed = 4;
        this.attackReach = 30;

        this.animationIndex = 0;
        this.animation = 0;
	},
	
	draw : function(canvas, context, player, camera, area) {
        if(this.moving) {
            if(player.x < camera.halfWidth) {
                context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(SpitterConstants['moveImages'][this.currentDirection][this.animationIndex],
                	camera.halfWidth - playerDistance - this.width/2,
                	this.y );
            }

        }
        else if(this.attacking){
        	if(player.x < camera.halfWidth) {
        		//console.log('atk1');
        		context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - this.width/2,
                  					this.y);
        	}
        	else if(player.x > area.width - camera.halfWidth - player.width/2) {
        		//console.log('atk2');
        		context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else{
            	//console.log('atk3');
            	var playerDistance = Math.abs(player.x - this.x);
        	context.drawImage(SpitterConstants['attackImages'][this.currentDirection][this.animationIndex],
        						camera.halfWidth - this.width/2 ,
        						this.y);
            }
        }

	},

	update : function(framerate, player) {
        if(Math.abs((this.x - player.x)) < this.attackReach){
        	this.moving = false;
        	this.attacking = true;

            //console.log('attack!');
        	this.animation += framerate;
        	if(this.animation >= 150) {
                this.animationIndex++;
                if(this.animationIndex >= SpitterConstants['attackImages'][this.currentDirection].length) {
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
                if(this.animationIndex >= SpitterConstants['moveImages'][this.currentDirection].length) {
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
	},
	collide : function(player){
		this.base(player);
	}

});