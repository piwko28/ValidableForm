RegexpValidator.prototype = Object.create(Validator.prototype);
RegexpValidator.prototype.constructor = RegexpValidator;

function RegexpValidator(name, element, regexp) {
	Validator.call(this, name, element);
	this.regexp = regexp;
}

RegexpValidator.prototype.validate = function() {
	var result = true;
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	if(tag === 'input' && type.equals('text', 'password', 'email')) {
		if(!this.element.value.match(this.regexp)) {
			result = false;
		}
	}
	return result;
};
