include("js/game/Door.js");
include("js/game/NPC.JS");

var Area = Base.extend({
    constructor : function(width, height, backgroundSrc, foregroundSrc, groundSrc) {
        this.backgound = new Image();
        this.foreground = new Image();
        this.ground = new Image();

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;

        this.doors = [];
        this.npc = [new Friendly(80, 100, 80, 100, "")];
        this.ennemies = [new Hostile(80, 100, 80, 300, "")];


        this.doors.push(new Door("town", 750, height-200));
    },

    update : function(framerate) {
        for(var i = 0; i< this.npc.length; i++){
            this.npc[i].update(framerate);
        }
        for(var i = 0; i< this.ennemies.length; i++){
            this.ennemies[i].update(framerate);
        }
    },

    draw : function(canvas, context, camera) {

        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.foreground, 0, camera.height-265);



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