include("js/game/Area.js");

var ExampleGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight);

        this.areas = [];
        this.currentArea = "";


        this.addArea("main", new Area(5000, 2000, "/images/Background.png", "/images/Middle_ground.png", "/images/Ground1.png"));
        this.changeArea("main");
        //this.player = new Player();
	},

    addArea : function(areaName, area) {
        this.areas[areaName] = area;
    },

    changeArea : function(areaName) {
        this.currentArea = areaName;
    },
	
	draw : function(canvas, context) {
		context.fillStyle = "#666";
		context.fillRect(0, 0, canvas.width, canvas.height);

        this.areas[this.currentArea].draw(canvas, context, this.camera);
	},

	update : function(framerate) {
       // console.log(this.camera.width, this.camera.height);
	},

    keypress : function(key) {

    },


    keyrelease : function(key) {

    }
});