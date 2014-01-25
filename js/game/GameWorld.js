var GameWorld = World.extend({
	constructor : function(width, height) {
		this.areas = [];
        this.currentArea = "";

        //this.player = new Player();
	},

    addArea : function(areaName, areaObject) {
      this.areas[areaName] = areaObject;
    },

    changeArea : function(newArea) {
        this.currentArea = newArea;
    },
	
	draw : function(context) {
		//this.areas[this.currentArea].draw(context);
	}
});