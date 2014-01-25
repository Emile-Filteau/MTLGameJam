include("js/game/Door.js");
include("js/game/NPC.JS");

var Area = Base.extend({
    constructor : function(gameRef, width, height, backgroundSrc, foregroundSrc, groundSrc) {
        this.game = gameRef;
        this.backgound = new Image();
        this.foreground = new Image();
        this.ground = new Image();

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;

        this.doors = [];
        this.npc = [new Friendly(80, 100, 400, (height - 200), "")];
        this.ennemies = [new Hostile(80, 100, 80, 300, "")];


        this.doors.push(new Door("town", 740, height-210));
    },


    update : function(framerate, player) {
        for(var i = 0; i< this.npc.length; i++){
            this.npc[i].update(framerate);
        }
        for(i in this.ennemies){
            this.ennemies[i].update(framerate);
        }

        for(i in this.doors) {
            if(this.doors[i].collide(player)) {
                this.game.changeArea(this.doors[i]);
            }
        }
    },

    drawBackground : function(canvas, context, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.foreground, 0, camera.height-265);

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