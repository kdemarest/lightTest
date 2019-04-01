
let Phase = {
	visibility: 'visibility',
	floors: 'floors',
	items: 'items',
	players: 'players',
	explosions: 'explosions'
}

class Sprite extends Entity {
	constructor(img,phase,details) {
		if( !img ) throw "oops";
		console.assert(img && img.src);
		console.assert( Phase[phase] );
		super();
		this.img = img;
		this.phase = phase;
		this.visible = true;
		this.x = null;
		this.y = null;
		this.w = null;
		this.h = null;
		this.frameIndex = 0;
		this.frameCount = !img.sheet ? 0 : ( img.sheet.frameCount || img.sheet.across*img.sheet.down);
		console.assert( this.frameCount>=0 );
		this.onDraw = (ctx) => {
			this._drawCtr(ctx);
		}
		if( details ) this.det(details);
		this.img.onInit ? this.img.onInit.call(this,this) : 0;
		Sprite.addMe.call(this);
	}

	setPos(x,y) {
		this.x=x;
		this.y=y;
		return this;
	}

	getDrawParameters(frameIndex,x,y,w,h) {
		frameIndex = frameIndex % this.frameCount;
		let sw = this.img.width/this.img.sheet.across;
		let sh = this.img.height/this.img.sheet.down;
		let sx = (frameIndex % this.img.sheet.across) * sw;
		let sy = Math.floor(frameIndex/this.img.sheet.across) * sh;

		return [this.img,sx,sy,sw,sh,x,y,w,h];
	}

	_drawCtr(ctx) {
		if( this.img.sheet ) {
			let w = this.w!==null ? this.w : this.img.width / this.img.sheet.across;
			let h = this.h!==null ? this.h : this.img.height / this.img.sheet.down;
			let params = this.getDrawParameters( this.frameIndex, this.x, this.y, w, h );
			params[5] -= params[7]/2;	// centers the destination x
			params[6] -= params[8]/2;	// centers the destination y
			ctx.drawImage(...params);
		}
		else {
			let x = this.x - ( (this.w!==null) ? this.w : this.img.width )/2;
			let y = this.y - ( (this.h!==null) ? this.h : this.img.height )/2;
			ctx.drawImage( this.img, x, y );
		}
	}

	draw(ctx) {
		if( !this.visible ) return;
		this.onDraw(ctx);
	}
}

class SpriteList extends EntityList {

	setPhase(ctx,phase) {
		if( phase == Phase.visibility ) {
			// Draw the pixels representing light brightness
			ctx.globalCompositeOperation = 'source-over';
			ctx.clearRect(0,0,800,800);
		}
		else if( phase == Phase.explosions ) {
			ctx.globalCompositeOperation = 'source-over';
		}
		else {
			// Shift composite modes, so that whatever is drawn never exceeds the transparency of whatever is below it
			ctx.globalCompositeOperation = 'source-atop';
		}
	}

	render(ctx) {
		Object.values(Phase).forEach( phase => {
			this.setPhase( ctx, phase );
			this.forEach( sprite => {
				if( sprite.alive && sprite.phase == phase ) {
					sprite.draw(ctx);
				}
			});
		});
	}

}
