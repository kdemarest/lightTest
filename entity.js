class Entity {
	constructor() {
		this.alive = true;
		this.onEnd = null;
		this.onTick = null;
	}
	set(obj) {
		for( let key in obj ) {
			this[key] = obj[key];
		}
		return this;
	}
	checkAlive() {
		if( !this.alive ) {
			this.onEnd ? this.onEnd() : 0;
		}
		return this.alive;
	}
	tick() {
		this.onTick ? this.onTick(this) : 0;
	}
}

class EntityList {
	constructor() {
		this.list = [];
	}
	push() {
		for( let a of arguments ) {
			a.manager = this;
			this.list.push(a);
		}
	}
	forEach(fn) {
		this.list.forEach(fn);
	}
	tick() {
		this.list.forEach( anim => anim.tick() );
	}
	checkAlive() {
		this.list.filterInPlace( item => item.checkAlive() );
	}
}
