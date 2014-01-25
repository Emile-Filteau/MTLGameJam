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
        //console.log(this.backgound.width, this.backgound.height)
        console.log(camera.width, camera.height - 100)
        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.foreground, 0, 140, 857, 200);

        context.drawImage(this.ground, 0, 300);


        //NPCs
         for(var i = 0; i< this.npc.length; i++){
            this.npc[i].draw(canvas, context);
        }
        for(var i = 0; i< this.ennemies.length; i++){
            this.ennemies[i].draw(canvas, context);
        }
        //context.drawImage(this.ground, 0, camera.height - 195, 1920, 195);
    }
        
}
});