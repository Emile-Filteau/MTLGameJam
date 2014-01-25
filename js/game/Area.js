include("js/game/Door.js");
include("js/game/NPC.JS");

var Area = Base.extend({
    constructor : function(gameRef, width, height, backgroundSrc, foregroundSrc, groundSrc, cloudsSrc) {
        this.width = width;
        this.height = height;
        this.game = gameRef;
        this.backgound = new Image();
        this.foreground = new Image();
        this.clouds = new Image();
        this.ground = new Image();

        this.groundLevel = height - 100;

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;
        this.clouds.src = cloudsSrc;

        this.doors = [];
        this.npc = ""//[new Friendly(80, 100, 400, this.groundLevel - 200, "")];
        this.ennemies = [new Spitter(600, this.groundLevel)];

        this.backgroundOffset = 0;
        this.foreGroundFinalOffset = 0;
        this.groundFinalOffset = 0;
        //this.doors.push(new Door("town", 1000, height-198));
    },


    update : function(framerate, player) {
        this.backgroundOffset = player.x - 400;

        for(i in this.npc){
            this.npc[i].update(framerate, player);
        }
        for(i in this.ennemies){
            this.ennemies[i].update(framerate, player);
        }

        for(i in this.doors) {
            if(this.doors[i].collide(player)) {
                this.game.changeArea(this.doors[i]);
            }
        }
    },

    drawBackground : function(canvas, context, player, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.clouds, 0, 0);

        if(player.x < camera.halfWidth) {
            context.drawImage(this.foreground, 0, camera.height-465);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.foreground, -this.foreGroundFinalOffset, camera.height-465);
        }
        else {
            this.foreGroundFinalOffset = this.backgroundOffset/2;
            context.drawImage(this.foreground, -this.backgroundOffset/2, camera.height-465);
        }

    },

    drawProps : function(canvas, context, player, camera) {
        //NPCs
        for(var i = 0; i< this.npc.length; i++){
            this.npc[i].draw(canvas, context, player, camera, this);
        }
        for(var i = 0; i< this.ennemies.length; i++){
            this.ennemies[i].draw(canvas, context, player, camera, this);
        }

        if(player.x < camera.halfWidth) {
            context.drawImage(this.ground, 0, camera.height-100);
        }
        else if(player.x > this.width - camera.halfWidth - player.width/2) {
            finaloffset = this.width - camera.halfWidth - player.width/2;
            context.drawImage(this.ground, -this.groundFinalOffset, camera.height-100);
        }
        else {
            this.groundFinalOffset = this.backgroundOffset;
            context.drawImage(this.ground, -this.backgroundOffset, camera.height-100);
        }

        for(i in this.doors) {
            this.doors[i].draw(canvas, context);
        }
    }
});