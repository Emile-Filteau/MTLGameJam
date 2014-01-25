var Door = Base.extend({
    constructor : function(toArea, x, y, destX, destY) {
        this.toArea = toArea;
        this.x = x;
        this.y = y;

        this.destX = destX;
        this.destY = destY;

    },
    /*
    goTo : function() {
        ??? in Area maybe
    },
*/
    draw : function(canvas, context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.x, this.y, 50 , 100);
    }
});