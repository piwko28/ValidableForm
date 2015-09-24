function Validator(name, element) {
	this.name = name;
	this.element = element;
	this.valid = true;
	this.errorMessage = "{0} is not valid.";
	this.group = [];
}

Validator.prototype.test = function() {
	this.valid = this.validate();
	if(!this.valid) {
		this.element.addClass('error');
		this.group.forEach(function() {
			this.addClass('error');
		});
	} else {
		this.element.removeClass('error');
		this.group.forEach(function() {
			this.removeClass('error');
		});
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
	var i;
	if(tag === 'input' && type === 'checkbox') {
		value = this.element.checked;
	} else if((tag === 'input' && type.equals('text', 'password', 'email')) || tag === 'textarea' || tag === 'select') {
		value = this.element.value;
	} else if(tag === 'input' && type === 'radio') {
		this.group = document.getElementsByName(this.element.name);
		for(i = 0; !value && i < this.group.length; i++) {
			if(this.group[i].checked) {
				value = this.group[i].value;
			}
		}
	}
	return value;
};
