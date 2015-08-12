CustomValidator.prototype = Object.create(Validator.prototype);
CustomValidator.prototype.constructor = CustomValidator;

function CustomValidator(name, element, fn) {
	Validator.call(this, name, element);
	this.fn = fn;
}

CustomValidator.prototype.validate = function() {
	var value = this.element.value;
	return this.fn(value);
};
