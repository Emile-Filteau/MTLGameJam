var Hole = Base.extend({
	constructor: function(x, width){
		this.x = x;
		this.width = width;
	},

	collide: function(player){


		if(player.currentDirection.indexOf("L") != -1){
			if((player.x - player.width/2) > this.x && (player.x + player.width/2) < (this.x + this.width) && player.y == player.groundY){
				player.inHole = true;
			}
		}
			
		else if(player.currentDirection.indexOf("R") != -1){
			if((player.x - player.width/2) > this.x && (player.x + player.width/2) < (this.x + this.width) && player.y == player.groundY){
				player.inHole = true;
			}
		}
	}
});