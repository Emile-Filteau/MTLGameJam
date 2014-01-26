var BlockConstants = {
    image : new Image()
}

BlockConstants['image'].src = "./images/env/block.png"

var Block = Base.extend({
    constructor : function(x, y) {
        this.x = x;
        this.y = y;

        this.width = 160;
        this.height = 119;
    },

    draw : function(canvas, context, player, camera, area) {
        if(player.x < camera.halfWidth) {
            context.drawImage(BlockConstants['image'], this.x - this.width/2, this.y - this.height);
        }
        else if(player.x > area.width - camera.halfWidth - player.width/2) {
            context.drawImage(BlockConstants['image'], this.x - area.width/2 + player.width/2, this.y - this.height);
        }
        else {
            var playerDistance = player.x - this.x;
            context.drawImage(BlockConstants['image'], camera.halfWidth - playerDistance - this.width/2, this.y - this.height);
        }
    },
    collide : function(player, area) {

                
        
    }
}); 
