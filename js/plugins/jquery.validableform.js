(function($) {

	$.fn.validableForm = function(errorContainer, defaultErrors, onError) {

		$(this).each(function() {
			new AutoValidator(this, $(this).find(errorContainer)[0], defaultErrors, onError);
		});

	};

})(jQuery);