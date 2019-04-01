class Entity {
	constructor() {
		this.alive = true;
		this.paused = false;
		this.onEnd = [];
		this.onTick = null;
		Entity.addMe.call(this);
	}
	set(obj) {
		for( let key in obj ) {
			this[key] = obj[key];
		}
		return this;
	}
	checkAlive() {
		if( !this.alive ) {
			this.onEnd.forEach( fn => fn.call(this) );
		}
		return this.alive;
	}
	tick() {
		this.onTick && !this.paused ? this.onTick(this) : 0;
	}
}

class EntityList {
	constructor() {
		this.list = [];
	}
	forEach(fn) {
		this.list.forEach(fn);
	}
	tick() {
		this.list.forEach( entity => entity.tick() );
	}
	checkAlive() {
		this.list.filterInPlace( entity => entity.checkAlive() );
	}
}
