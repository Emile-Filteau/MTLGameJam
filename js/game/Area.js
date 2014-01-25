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

    draw : function(canvas, context) {
        context.drawImage(this.backgound, 0, 0, canvas.width, canvas.height);

        //context.drawImage(this.foreground, 0, 0);

        context.drawImage(this.ground, 0, canvas.height - 195, 1920, 195);
    }
});