(function($) {

	$.fn.validableForm = function(errorContainer, defaultErrors) {

		$(this).each(function() {
			new AutoValidator(this, $(this).find(errorContainer)[0], defaultErrors);
		});

	};

})(jQuery);