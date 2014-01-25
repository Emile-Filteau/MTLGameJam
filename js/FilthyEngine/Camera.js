var Camera = Base.extend({
	constructor :function(width, height) {
		this.width =  width;
		this.height = height;
		this.halfWidth = width/2;
		this.halfHeight = height/2;
		//this.position = new Point(this.halfWidth, this.halfHeight);
        this.position = new Point(this.halfWidth, 0);
        this.deltaX = (1/8) * this.width;
        this.minTreshold = this.position.x - this.deltaX;
        this.maxTreshold = this.position.x + this.deltaX;
                
	},
	
	resize : function(width, height, world) {
		this.width =  width;
		this.height = height;
		this.halfWidth = width/2;
		this.halfHeight = height/2;
        /*
		if(this.position.x <= this.halfWidth) {
			this.position.x = this.halfWidth;
		}
		else if(this.position.x >= world.width-(this.halfWidth)) {
			this.position.x = world.width-(this.halfWidth);
		}
		if(this.position.y <= this.halfHeight) {
			this.position.y = this.halfHeight;
		}
		else if(this.position.y >= world.height-(this.halfHeight)) {
			this.position.y = world.height-(this.halfHeight);
		}
		*/
	},
	
	update : function(player) {
        if(player.x >= this.position.x + this.halfWidth * 0.25) {
            this.position.x = player.x - this.halfWidth * 0.25;
        } else if(player.x <= this.position.x - this.halfWidth * 0.25) {
            this.position.x = player.x + this.halfWidth * 0.25;
        }
	},

	isInViewport : function(position, width, height) {
		if(position.x + width/2 > this.position.x - this.halfWidth && position.x - width/2 < this.position.x + this.halfWidth)
		{
			if(position.y + height/2 > this.position.y - this.halfHeight && position.y - height/2 < this.position.y + this.halfHeight)
			{
				return true;
			}
		}
		return false;
	},
	
	calculateRelativePosition : function(position) {
		return new Point(position.x - (this.position.x-this.halfWidth), position.y - (this.position.y - this.halfHeight));
	},
	
	calculateAbsolutePosition : function(x, y) {
		return new Point(x + (this.position.x-this.halfWidth), y + (this.position.y - this.halfHeight));
	}
});