include("js/game/ExampleGame.js");
include("js/view/ExampleView.js");

Example = FilthyEngine.extend({
	constructor : function(containerId, fullscreen, alwaysRefresh) {
		this.base(containerId, fullscreen, alwaysRefresh);
		
		
		this.game = new ExampleGame(400, 400);
		/** Sound Example
			SoundManager.load("sounds/hit", 'hit_sound', true); //load(url, id, isLooping)
			SoundManager.setVolume('hit_sound', 0.3); //sets the volume in a range from 0 to 1
			SoundManager.play('hit_sound'); //play(id)
			SoundManager.pause('hit_sound'); //pause(id) really usefull for looping sounds
		*/
		
		/** Ajax call example
		AjaxManager.execute("scriptpath/scriptname.php", {key1:'value1', key2:'value2'}, function(data){
			//callback with scripts answer passed as param
			console.log(data);
		});
		*/
	},

	init : function() {
		this.base();
		var ref = this;
	
        this.addView('GAME',
            new ExampleView('partials/example.htm', 'example_canvas', ref.game, function() {
			
				/* Socket events goes here
                ref.getSocket('main').listenTo('gameMessage',  function(data) {
                });
				
				*/
				
				ref.changeView('GAME');
            })
        );
        this.getView('GAME').init = function() {
			$(document).bind("keydown", function(event) {
                console.log(event.which);
            });
            $(document).bind("keyup", function(event) {
                console.log(event.which);
            });

            $(ref.getView('GAME').rootId).bind("mousedown", function(event) {
                ref.game.clearSquares();
            });
			
			/* Mouse Release
            $(document).bind("mouseup", function(event) {
				
            });
			*/
			
			/* Mouse movement
            $(document).bind("mousemove", function(event) {
				
            });

			/* Useful for overwriting rightclick contextmenu
            $(document).bind("contextmenu", function(event) {  
                event.preventDefault();
            });
			*/
            ref.setAlwaysRefresh(true);
        }
	},
	
	loop : function(framerate) {
		this.base(framerate);
		this.game.update(framerate);
	}
});