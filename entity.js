class Entity {
	constructor() {
		this.alive = true;
		this.paused = false;
		this.onEnd = [];
		this.onTick = [];
		Entity.addMe.call(this);
	}
	set(obj) {
		for( let key in obj ) {
			this[key] = obj[key];
		}
		return this;
	}
	checkAlive() {
		// DO NOT CALL this anywhere but in the entity cleanup code. If you want to know if something is alive, just use .alive
		if( !this.alive ) {
			this.onEnd.forEach( fn => fn.call(this) );
		}
		return this.alive;
	}
	tick() {
		this.onTick && !this.paused ? this.onTick.forEach( fn => fn.call(this) ) : 0;
	}
}

class EntityList {
	constructor() {
		this.list = [];
	}
	forEach(fn) {
		return this.list.forEach(fn);
	}
//	forEach() {
//		return this.list.forEach.apply(this,arguments);
//	}
	tick() {
		this.list.forEach( (entity) => entity.tick() );
	}
	checkAlive() {
		this.list.filterInPlace( (entity) => entity.checkAlive() );
	}
}
