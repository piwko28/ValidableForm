function ValidableForm(container) {
	this.container = container;
	this.errorContainer = undefined;
	this.validators = [];
	this.valid = true;
}

ValidableForm.prototype.addValidator = function(validator) {
	this.validators.push(validator);
};

ValidableForm.prototype.validate = function() {
	var i;
	var error;
	this.valid = true;
	if(typeof this.errorContainer !== 'undefined') {
		this.errorContainer.innerHTML = '';
	}
	for(i in this.validators) {
		if(this.validators[i].test() === false) {
			this.valid = false;
			if(typeof this.errorContainer !== 'undefined') {
				error = document.createElement("div");
				error.className = "error";
				error.innerHTML = this.validators[i].getErrorMessage();
				this.errorContainer.appendChild(error);
			}
		}
	}
	if(this.valid) {
		this.errorContainer.removeClass('has-errors');
	} else {
		this.errorContainer.addClass('has-errors');
	}
	return this.valid;
};

ValidableForm.prototype.setErrorContainer = function(container) {
	this.errorContainer = container;
};

ValidableForm.prototype.watchButtons = function() {
	var that = this;
	this.container.all('input[type=submit]').on('click', function(event) {
		that.validate();
		if(!that.valid) {
			event.preventDefault();
		}
	});
};
