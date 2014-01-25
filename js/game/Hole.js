var Hole = Base.extend({
	constructor: function(x, width){
		this.x = x;
		this.width = width;
	},

	collide: function(player){

		if(player.x > this.x && player.x < (this.x + this.width) && player.y == player.groundY){
			player.inHole = true;
		}
	}
});