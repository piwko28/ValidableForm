RequiredValidator.prototype = Object.create(Validator.prototype);
RequiredValidator.prototype.constructor = RequiredValidator;

function RequiredValidator(name, element) {
	Validator.call(this, name, element);
	this.errorMessage = "{0} is required.";
}

RequiredValidator.prototype.validate = function() {
	var value = this.getValue();
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	var result = (typeof value === 'string' && value !== "") ||
		(typeof value === 'boolean' && value);
	return result;
};
