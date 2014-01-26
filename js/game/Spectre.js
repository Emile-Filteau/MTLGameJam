include("js/game/NPC.js");

var SpectreConstants = {
    idleImages : [],
    deathImages : [],
    IDLE : 0,
    MOVE : 1
}
SpectreConstants['idleImages']['L'] = [];
SpectreConstants['idleImages']['L']["U"] = new Image()
SpectreConstants['idleImages']['L']["D"] = new Image()
SpectreConstants['idleImages']['L']["U"].src = "./images/spectre/left/up.png";
SpectreConstants['idleImages']['L']["D"].src = "./images/spectre/left/down.png"

SpectreConstants['idleImages']['R'] = [];
SpectreConstants['idleImages']['R']["U"] = new Image()
SpectreConstants['idleImages']['R']["D"] = new Image()
SpectreConstants['idleImages']['R']["U"].src = "./images/spectre/right/up.png";
SpectreConstants['idleImages']['R']["D"].src = "./images/spectre/right/down.png";
/*
SpectreConstants['deathImages']['L'] = [];
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
SpectreConstants['deathImages']['L'].push(new Image());
for(i in SpectreConstants['deathImages']['L']) {
    SpectreConstants['deathImages']['L'][i].src = "./images/spectre/runLeft/SpitterWalk"+i+".png";
}
SpectreConstants['deathImages']['R'] = [];
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
SpectreConstants['deathImages']['R'].push(new Image());
for(i in SpectreConstants['deathImages']['R']) {
    SpectreConstants['deathImages']['R'][i].src = "./images/spectre/runRight/SpitterWalk"+i+".png";
}*/
var Spectre = Hostile.extend({
	
    constructor : function(posX, posY) {
		this.height = 31;
		this.width = 29;
		this.x = posX;
		this.y = posY - this.height/2 - 50;
        this.hp = 3;
        this.currentDirection = "L";
        this.currentOrientation = "U";
        this.moving = true;
        this.attacking = false;
        this.speed = 4;
        this.attackReach = 30;
        this.attackSpeed = 1.7;
        this.animationIndex = 0;
        this.animation = 0;
        this.animationFrameDamageTreshold = 3;
	},
	
	draw : function(canvas, context, player, camera, area) {

        if(this.moving) {
            if(player.x < camera.halfWidth) {
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                 					this.x - this.width/2,
                  					this.y);
            }
            else if(player.x > area.width - camera.halfWidth - player.width/2) {
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                 					this.x - area.width/2 + player.width/2,
                 					this.y);
            }
            else {
                var playerDistance = player.x - this.x;
                context.drawImage(SpectreConstants['idleImages'][this.currentDirection][this.currentOrientation],
                	camera.halfWidth - playerDistance - this.width/2,
                	this.y );
            }

        }

	},

	update : function(framerate, player) {
        if(Math.abs((this.x - player.x)) <= this.attackReach || (this.attacking && this.animationIndex > 0 )) {
        	this.moving = false;
        	this.attacking = true; 
            //console.log('attack!');
        	this.animation += framerate;
        	if(this.animation >= this.attackSpeed * 100) {
                this.animationIndex++;
                if(this.animationIndex == SpectreConstants['attackImages'][this.currentDirection].length - this.animationFrameDamageTreshold
                    && (Math.abs((this.x - player.x)) <= this.attackReach ) ) {
                    console.log('PUKE HITS OH YEAH');
                    player.hp -= 1;
                } 
                if(this.animationIndex >= SpectreConstants['attackImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                    attacking = false;
                    movien = true;
                }
                this.animation = 0;
            }

        }
        else if (this.animationIndex == 0){
        	this.attacking = false;
        	this.moving = true;
        	this.animationIndex = 0
        }
        if(this.moving) {
            this.animation += framerate;
            /*
            if(this.animation >= 250) {
                this.animationIndex++;
                if(this.animationIndex >= SpectreConstants['moveImages'][this.currentDirection].length) {
                    this.animationIndex=0;
                }
                this.animation = 0;
            }*/
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