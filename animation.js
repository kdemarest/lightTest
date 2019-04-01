class Animation extends Entity {
	constructor(template,target,settings) {
		super();
		this._delay = 0.0;
		template.call( this, target, settings );
		Animation.addMe.call(this);
	}
	set delay(value)	{ this._delay = value; }
	get delay()			{ return this._delay; }
	tick() {
		if( this.delay > 0 ) {
			this.delay -= 1/FPS;
		}
		this.paused = this.delay > 0;
		super.tick();
	}
}

class AnimationList extends EntityList {
}
