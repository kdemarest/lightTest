class Animation extends Entity {
	constructor(template,target,settings) {
		super();
		template.call( this, target, settings );
	}
}

class AnimationList extends EntityList {
}
