include("js/game/Door.js");
include("js/game/NPC.JS");

var Area = Base.extend({
    constructor : function(gameRef, width, height, backgroundSrc, foregroundSrc, groundSrc, cloudsSrc) {
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
        this.npc = [new Friendly(80, 100, 400, this.groundLevel - 200, "")];
        this.ennemies = [new Hostile(600, this.groundLevel)];


        //this.doors.push(new Door("town", 1000, height-198));
    },


    update : function(framerate, player) {
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

    drawBackground : function(canvas, context, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.clouds, 0, 0);

        context.drawImage(this.foreground, 0, camera.height-465);

    },

    drawProps : function(canvas, context, camera) {
        //NPCs
        for(var i = 0; i< this.npc.length; i++){
            this.npc[i].draw(canvas, context);
        }
        for(var i = 0; i< this.ennemies.length; i++){
            this.ennemies[i].draw(canvas, context);
        }

        context.drawImage(this.ground, 0, camera.height-100);

        for(i in this.doors) {
            this.doors[i].draw(canvas, context);
        }
    }
});