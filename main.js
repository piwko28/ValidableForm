var form;
var formContainer = document.one('#form');
var surname = formContainer.one("#surname");
var email = formContainer.one("#email");

if(formContainer !== null) {
	form = new ValidableForm(formContainer);
	form.addValidator(new RequiredValidator('Name', surname));
	form.addValidator(new EmailValidator('E-mail', email));
	form.setErrorContainer(formContainer.one(".errors"));
	form.watchButtons();
}