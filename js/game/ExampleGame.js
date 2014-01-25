include("js/game/Area.js");
include("js/game/Player.js");

var ExampleGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight);


        this.areas = [];
        this.currentArea = "";
        this.addArea("main", new Area(5000, 2000, "./images/Background.png", "./images/Middle_ground.png", "./images/Ground1.png"));
        this.changeArea("main");
        //this.player = new Player(173, 250, 100, this.camera.height - 195, "./images/Barb_knight_small.png");
        this.player = new Player(173, 250, 100, this.camera.height - 185, "./images/Barb_knight_small.png");
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
        this.player.draw(canvas, context);
	},

	update : function(framerate) {
       // console.log(this.camera.width, this.camera.height);
       this.areas[this.currentArea].update(framerate);
	},

    keypress : function(key) {
        
        switch(key)
		{
		case 37:
			this.player.mouvement = "L";
	  		break;
		case 39:
			this.player.mouvement = "R";
	 		break;
		default:
		 break;
		}
    },


    keyrelease : function(key) {

    	if(key == 37 || key == 39)
    		this.player.mouvement = "";
    }
});