include("js/game/Area.js");
include("js/game/Player.js");

var ExampleGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight);
        this.areas = [];
        this.currentArea = "";
        this.addArea("main", new Area(this, 5000, cameraHeight, "./images/Background.png", "./images/Middle_ground.png", "./images/Ground1.png"));
        this.setArea("main");
        this.player = new Player(173, 250, 100, this.camera.height - 185, "./images/Barb_knight_small_L.png", "./images/Barb_knight_small_R.png");
	},

    addArea : function(areaName, area) {
        this.areas[areaName] = area;
    },

    setArea : function(newArea) {
        this.currentArea = newArea;
    },

    changeArea : function(door) {
        this.currentArea = door.toArea;
        this.player.x = door.destX;
        this.player.y = door.destY;
    },
	
	draw : function(canvas, context) {
		context.fillStyle = "#666";
		context.fillRect(0, 0, canvas.width, canvas.height);

        this.areas[this.currentArea].drawBackground(canvas, context, this.camera);
        this.player.draw(canvas, context);
        this.areas[this.currentArea].drawProps(canvas, context, this.camera);
	},

	update : function(framerate) {
       // console.log(this.camera.width, this.camera.height);
       this.areas[this.currentArea].update(framerate, this.player);
	},
	
    keypress : function(key) {
        
        switch(key)
		{
		case 32: //Spacebar
			this.player.jump();
			break;
		case 37://Left arrow
			this.player.mouvement = "L";
	  		break;
		case 39://Right arrow
			this.player.mouvement = "R";
	 		break;

	 	case 90://Z
	 		this.player.interact();
	 		break;
		default:
		 break;
		}
    },


    keyrelease : function(key) {
    	switch(key)
		{
		case 32:
			this.player.endJump();
			break;
		case 37:
			this.player.mouvementReplace("L");
	  		break;
		case 39:
			this.player.mouvementReplace("R");
	 		break;
		default:
		 break;
		}    		
    }
});