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
		this.height = 62;
		this.width = 58;
		this.x = posX ;
		this.y = posY - this.height/2 - 50;
        this.hp = 1;
        this.currentDirection = "L";
        this.currentOrientation = "U";
        this.moving = true;
        this.attacking = false;
        this.speed = 4;
        this.attackReach = 100;
        this.attackSpeed = 1.7;
        this.animationIndex = 0;
        this.animation = 0;
        this.animationFrameDamageTreshold = 3
        this.aggroRadius = 300;
        this.isAggro = false;
        this.minHeight = 200;
        this.maxHeight = 350;
	},
	
	draw : function(canvas, context, player, camera, area) {
        if(this.moving || this.attacking) {
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
        if(Math.abs(this.x - player.x) < this.aggroRadius  || this.isAggro) {
            this.isAggro = true;
        if(Math.abs((this.x - player.x)) <= this.attackReach || (this.attacking && this.animationIndex > 0 )) {
        	this.moving = false;
        	this.attacking = true;
        }
        if(this.moving) {
            if(this.currentDirection == "L") {
                if(this.currentOrientation == "U") {
                    this.x -= this.speed;
                    this.y -= this.speed;
                    if(this.y <= this.minHeight)
                        this.currentOrientation = "D";
                } else {
                    this.x -= this.speed;
                    this.y += this.speed;
                    if(this.y >= this.maxHeight)
                        this.currentOrientation = "U";
                }
            } else {
                if(this.currentOrientation == "U") {
                    this.x += this.speed;
                    this.y -= this.speed;
                    if(this.y <= this.minHeight)
                        this.currentOrientation = "D";
                } else {
                    this.x += this.speed;
                    this.y += this.speed;
                    if(this.y >= this.maxHeight)
                        this.currentOrientation = "U";
                }
            }
        } else if(this.attacking) {
            if(this.x < player.x) {
                this.x+=this.speed;
                this.currentDirection = "R";
            } else {
                this.x-=this.speed;
                this.currentDirection = "L";
            }
            if(this.x > player.x - player.width/2 && this.x < player.x + player.width/2) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
        this.collide(player);
    }
	},

	collide : function(player){
		this.base(player);
	}

});