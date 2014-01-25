var Weapon = Base.extend({
	constructor: function(damage, attackSpeed, reach, sanityThreshold, cooldown, typeAttack, sprite){

		this.damage = damage;
		this.attackSpeed = attackSpeed;
		this.reach = reach;
		this.sanityThreshold = sanityThreshold;
		this.cooldown = cooldown;
		this.typeAttack = typeAttack;
		this.sprite = sprite;
	},

	draw: function(){

	},

	update: function(){
		
	},

	use: function(){

	}
});