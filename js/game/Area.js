include("js/game/Door.js");

var Area = Base.extend({
    constructor : function(width, height, backgroundSrc, foregroundSrc, groundSrc) {
        this.backgound = new Image();
        this.foreground = new Image();
        this.ground = new Image();

        this.backgound.src = backgroundSrc;
        this.foreground.src = foregroundSrc;
        this.ground.src = groundSrc;

        this.doors = [];
        this.npc = [];
        this.ennemies = [];
    },

    update : function(framerate) {
    },

    draw : function(canvas, context, camera) {
        //console.log(this.backgound.width, this.backgound.height)
        context.drawImage(this.backgound, -camera.halfWidth, -camera.halfHeight);

        context.drawImage(this.foreground, 0, 0);

        //context.drawImage(this.ground, 0, camera.height - 195, 1920, 195);
    }
});