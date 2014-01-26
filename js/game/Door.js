var Door = Base.extend({
    constructor : function(toArea, x, y, destX, destY) {
        this.toArea = toArea;
        this.x = x;
        this.y = y;

        this.destX = destX;
        this.destY = destY;

        this.image = new Image();
        this.image.src = "./images/env/area_door.png"
        this.width = 121;
        this.height = 300;

    },
    /*
    goTo : function() {
        ??? in Area maybe
    },
*/
    draw : function(canvas, context) {
        context.drawImage(this.image, this.x, this.y-this.height);
    },

    collide : function(player) {
        if(player.x + 69 > this.x && player.x < this.x + 50) {
            if(player.y >= this.y)
                return true;
        }
        return false;
    }
});