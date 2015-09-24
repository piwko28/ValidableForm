CustomValidator.prototype = Object.create(Validator.prototype);
CustomValidator.prototype.constructor = CustomValidator;

function CustomValidator(name, element, fn) {
	Validator.call(this, name, element);
	this.fn = fn;
}

CustomValidator.prototype.validate = function() {
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	var value;
	if(tag === 'input' && type === 'checkbox') {
		value = this.element.checked;
	} else {
		value = this.element.value;
	}
	return this.fn(value);
};
