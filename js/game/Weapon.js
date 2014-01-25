var Weapon = Base.extend({
	constructor: function(damage, attackSpeed, reach, sanityThreshold, cooldown, typeAttack, sprites){

		this.damage = damage;
		this.attackSpeed = attackSpeed;
		this.reach = reach;
		this.sanityThreshold = sanityThreshold;
		this.cooldown = cooldown;
		this.typeAttack = typeAttack;
		this.sprites = sprites;
	},

	draw: function(){

	},

	update: function(){
		
	},

	use: function(){
		console.log(this.sprites["moveImages"]);


	}
});