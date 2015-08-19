RequiredValidator.prototype = Object.create(Validator.prototype);
RequiredValidator.prototype.constructor = RequiredValidator;

function RequiredValidator(name, element) {
	Validator.call(this, name, element);
	this.errorMessage = "{0} is required.";
}

RequiredValidator.prototype.validate = function() {
	var result = true;
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	if((tag === 'input' && type.equals('text', 'password', 'email')) || tag === 'textarea') {
		if(this.element.value === "") {
			result = false;
		}
	}
	return result;
};
