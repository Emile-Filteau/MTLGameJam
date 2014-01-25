//THIS IS AN EXAMPLE OF A STARTING POINT

include('js/Example.js');

var engine;

var FRAMERATE = 1000/30;
var lastLoop = new Date().getTime();
window.onload = init;

function init() {
	engine = new Example('engine-container', false, true);
	engine.init();
	loop();
}

function loop() {
	var newLoop = new Date().getTime();
	interval = newLoop - lastLoop;
	engine.loop(interval);
	
	lastLoop = new Date().getTime();
	setTimeout(loop, FRAMERATE);
}

/* 
Uncomment if you want to call onResize each time the web broswer is resized
$(window).resize(function() {
	engine.onResize();
});
*/