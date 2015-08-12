var form;
var formContainer = document.one('#form');
var surname = formContainer.one("#surname");
var email = formContainer.one("#email");
var custom = formContainer.one("#custom");

if(formContainer !== null) {
	form = new ValidableForm(formContainer);
	form.addValidator(new RequiredValidator('Name', surname));
	form.addValidator(new EmailValidator('E-mail', email));
	form.addValidator(new CustomValidator('5', custom, function(value) {
		return value == 5;
	}));
	form.setErrorContainer(formContainer.one(".errors"));
	form.watchButtons();
}