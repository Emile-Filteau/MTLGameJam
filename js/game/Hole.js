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
	},

	collideNPC: function(npc){

		
		if (Math.abs(this.x - npc.x) < 350 && npc.moving){

			if(npc.currentDirection.indexOf("L") != -1){
			
				console.log(npc.x + " " + (this.x + this.width) + " " + Math.abs(npc.x - (this.x + this.width)));

				if (Math.abs(npc.x - (this.x + this.width)) == 0){
					console.log("MUCH DISTANCE");
					npc.canRunLeft = false;
				}
			}
				
			else if(npc.currentDirection.indexOf("R") != -1){

				//console.log(npc.x + " " + this.x + " " + Math.abs((npc.x + npc.width/2) - this.x));

				if (Math.abs((npc.x) - this.x) == 0){
					console.log("MUCH DISTANCE");
					npc.canRunRight = false;
				}
			}
		}	
	}
});