RequiredValidator.prototype = Object.create(Validator.prototype);
RequiredValidator.prototype.constructor = RequiredValidator;

function RequiredValidator(name, element) {
	Validator.call(this, name, element);
}

RequiredValidator.prototype.validate = function() {
	var result = true;
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	if(tag === 'input' && type.equals('text', 'password', 'email')) {
		if(this.element.value === "") {
			result = false;
		}
	}
	return result;
};
