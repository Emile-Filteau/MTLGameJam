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
            // console.log(Math.abs(this.x - player.x));
           /* if (Math.abs(this.x - player.x) < 150){
                if(player.onGround ){
                    console.log(this);
                    //right side of Char touching left side of block
                    if(player.x + player.width/2 >= this.x - this.width/2 ){
                        player.canRunRight = false;
                        player.canRunLeft = true;
                    }
                    if(player.x - player.width/2 <= this.x + this.width/2  ){
                        player.canRunLeft = false;
                        player.canRunRight = true;
                    }
                }
                else {
                    player.canRunRight = true;
                    player.canRunLeft = true;
                }
            }*/
//var collisionCalculated = 0;
if (Math.abs(this.x - player.x) < 150 && Math.abs( (this.y + this.height/2 ) - (player.y + player.height/2)) < 200){

        if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2) 
                    && (player.groundY - player.y) > this.height /2){
            player.onBlock = true;
            console.log(0);
        }
        if((player.x + player.width/2) > (this.x - this.width/2) && (player.x + player.width/2) < (this.x + this.width/2)){
            console.log(1);
            if(player.mouvement.indexOf("R") != -1 && (player.staticGround - player.y) < this.height - 41){
                console.log(2);
                player.canRunRight = false;
            }

            else if(player.mouvement.indexOf("L") != -1 && (player.staticGround - player.y) < this.height - 41){
                console.log(3);
                player.canRunLeft = false;
            }

            if((player.groundY - player.y) > this.height - 41 && player.onBlock){
                console.log(4);
                player.groundY = (area.groundLevel - this.height + 21);
                player.canRunLeft = true;
                player.canRunRight = true;
            }

            if(player.onBlock && (player.x - player.width/2) < (this.x - this.width/2 - 30) && player.mouvement.indexOf("L") != -1){
                console.log(5);
                player.onBlock = false;
            }
                
        }
            if(player.onBlock && (player.x - player.width/2) > (this.x + this.width/2 - 30) && player.mouvement.indexOf("R") != -1){
                console.log(6);
                player.onBlock = false;
            }

        }
     //  if (collisionCalculated == 0){
      //      player.onBlock = false;
     //   }
    }
});