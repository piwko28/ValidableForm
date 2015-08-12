function Validator(name, element) {
	this.name = name;
	this.element = element;
	this.valid = true;
	this.errorMessage = "{0} is not valid.";
}

Validator.prototype.test = function() {
	this.valid = this.validate();
	if(!this.valid) {
		this.element.addClass('error');
	} else {
		this.element.removeClass('error');
	}
	return this.valid;
};

Validator.prototype.validate = function() {
	return false;
};

Validator.prototype.getErrorMessage = function() {
	return this.errorMessage.format(this.name);
};
