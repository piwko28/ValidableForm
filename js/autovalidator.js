function AutoValidator(container, errorContainer) {
	this.container = container;
	this.errorContainer = errorContainer;
	this.validators = [];
	this.form = undefined;
	this.init();
	this.makeValidators();
}

AutoValidator.prototype.addValidator = function(validator) {
	this.validators.push(validator);
	this.form.addValidator(validator);
};

AutoValidator.prototype.init = function() {
	this.form = new ValidableForm(this.container);
	if(this.errorContainer) {
		this.form.setErrorContainer(this.errorContainer);
	}
	this.form.watchButtons();
};

AutoValidator.prototype.makeValidators = function() {
	var autovalidator = this;
	/* RequiredValidator */
	this.container.querySelectorAll("[data-validator-required]").forEach(function() {
		autovalidator.addValidator(
			new RequiredValidator(this.dataset.name, this)
		);
	});
	/* RegexpValidator */
	this.container.querySelectorAll("[data-validator-regexp]").forEach(function() {
		autovalidator.addValidator(
			new RegexpValidator(this.dataset.name, this, this.dataset.validatorRegexp)
		);
	});
	/* EmailValidator */
	this.container.querySelectorAll("[data-validator-email]").forEach(function() {
		autovalidator.addValidator(
			new EmailValidator(this.dataset.name, this)
		);
	});
	/* CustomValidator */
	this.container.querySelectorAll("[data-validator-custom]").forEach(function() {
		autovalidator.addValidator(
			new CustomValidator(this.dataset.name, this, window[this.dataset.validatorCustom])
		);
	});
};