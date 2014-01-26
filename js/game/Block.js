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

    collideX : function(player, area) {

     
        if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2)){

            if(player.mouvement.indexOf("R") != -1 && (player.staticGround - player.y) < this.height - 41){
                player.canRunRight = false;
            }

            else if(player.mouvement.indexOf("L") != -1 && (player.staticGround - player.y) < this.height - 41){
                player.canRunLeft = false;
            }                
        }
    },

    collideY : function(player, area) {

        if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2) && (player.groundY - player.y) > this.height){
            player.onBlock = true;
            console.log(this);
            return this;
        }
        else {
            return null;
        }


     
       /* if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2)){

            if((player.groundY - player.y) > this.height - 41 && player.onBlock){
                player.groundY = (area.groundLevel - this.height + 21);
            }

            if(player.onBlock && (player.x - player.width/2) < (this.x - this.width/2 - 30) && player.mouvement.indexOf("L") != -1){
                player.onBlock = false;
            }
                
        }
        
        if(player.onBlock && (player.x - player.width/2) > (this.x + this.width/2) && player.mouvement.indexOf("R") != -1){
            player.onBlock = false;
        }*/
    },

    etage : function(player, area) {
    
        if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2)){

            if((player.groundY - player.y) > this.height - 41 && player.onBlock){
                player.groundY = (area.groundLevel - this.height + 21);
            }

            if(player.onBlock && (player.x - player.width/2) < (this.x - this.width/2 - 30) && player.mouvement.indexOf("L") != -1){
                player.onBlock = false;
            }

            if(player.onBlock && (player.x - player.width/2) > (this.x + this.width/2) && player.mouvement.indexOf("R") != -1){
                player.onBlock = false;
            } 
                
        }
        
        
    }
}); 