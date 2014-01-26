include("js/game/Door.js");
include("js/game/Block.js");
include("js/game/NPC.JS");
include("js/game/Hole.js");

var Area = Base.extend({
    constructor : function(gameRef, width, height, backgroundSrc, foregroundSrc, groundSrc, cloudsSrc) {
        this.width = width;
        this.height = height;
        this.game = gameRef;
        this.backgound = new Image();
        this.foreground = new Image();
        this.clouds = new Image();
        this.ground = new Image();

        this.groundLevel = height - 150;

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;
        this.clouds.src = cloudsSrc;

        this.doors = [];
        this.blocks = [] ;
        this.holes = [];
        this.npc = ""//[new Friendly(80, 100, 400, this.groundLevel - 200, "")];
        this.ennemies = [new Spitter(600, this.groundLevel)];
        this.ennemies.push(new Spectre(500, 200));
        this.ennemies = [];

        this.backgroundOffset = 0;
        this.foreGroundFinalOffset = 0;
        this.groundFinalOffset = 0;


        this.blocks.push(new Block(1495, this.groundLevel + 50));
        this.blocks.push(new Block(2105, this.groundLevel + 50));
        this.blocks.push(new Block(2440, this.groundLevel + 50));
        this.blocks.push(new Block(2440, this.groundLevel + 50 - 100));
        //this.doors.push(new Door("town", 1000, height-198));  
        
        this.holes.push(new Hole(2480, 185));//2670
        this.holes.push(new Hole(2900, 230));//3137
        this.holes.push(new Hole(4047, 310));//4365
        this.holes.push(new Hole(5025, 197));//5222
        this.holes.push(new Hole(6580, 247));//6827
        this.holes.push(new Hole(7035, 242));//7277
    },


    update : function(framerate, player) {
        this.backgroundOffset = player.x - 400;

        //console.log(player.x + " " + this.blocks[0].x);
        for(i in this.npc){
            this.npc[i].update(framerate, player);
        }
        for(i in this.ennemies){
            if(this.ennemies[i].hp > 0)
                this.ennemies[i].update(framerate, player);
        }

        for(i in this.doors) {
            if(this.doors[i].collide(player)) {
                this.game.changeArea(this.doors[i]);
            }
        }

        for(i in this.holes){
            this.holes[i].collide(player);
        }

        for(i in this.blocks) {
            this.blocks[i].collide(player, this);
        }
    },

    drawBackground : function(canvas, context, player, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.clouds, 0, 0);

        if(player.x < camera.halfWidth) {
            context.drawImage(this.foreground, 0, camera.height-390);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.foreground, -this.foreGroundFinalOffset, camera.height-390);
        }
        else {
            this.foreGroundFinalOffset = this.backgroundOffset/2;
            context.drawImage(this.foreground, -this.backgroundOffset/2, camera.height-390);
        }

    },

    drawProps : function(canvas, context, player, camera) {
        for(var i in this.blocks){
            this.blocks[i].draw(canvas, context, player, camera, this);
        }

        for(var i in this.npc){
            this.npc[i].draw(canvas, context, player, camera, this);
        }
        for(var i in this.ennemies){
            if(this.ennemies[i].hp > 0){
                this.ennemies[i].draw(canvas, context, player, camera, this);
            }
        }

        if(player.x < camera.halfWidth) {
            context.drawImage(this.ground, 0, camera.height-150);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.ground, -this.groundFinalOffset, camera.height-150);
        }
        else {
            this.groundFinalOffset = this.backgroundOffset;
            context.drawImage(this.ground, -this.backgroundOffset, camera.height-150);
        }

        for(i in this.doors) {
            this.doors[i].draw(canvas, context);
        }
    }
});