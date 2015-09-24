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

Validator.prototype.getValue = function() {
	var tag = this.element.tagName.toLowerCase();
	var type = this.element.type.toLowerCase();
	var value;
	if(tag === 'input' && type === 'checkbox') {
		value = this.element.checked;
	} else if((tag === 'input' && type.equals('text', 'password', 'email')) || tag === 'textarea') {
		value = this.element.value;
	}
	return value;
};
