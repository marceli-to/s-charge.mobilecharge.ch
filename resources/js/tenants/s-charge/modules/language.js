var Language = (function() {
	
	// selectors
	var selectors = {
    body:         'body',
    btnLanguage:  '.js-language-menu-btn',
    menuLanguage: '.js-language-menu'
	};

  // css classes
  var classes = {
    visible: 'is-visible',
  };

  // Init
  var _initialize = function() {
    _bind();
  };

  // Bind events
  var _bind = function() {
    $(selectors.body).on('click', selectors.btnLanguage, function(e) {
      $(selectors.menuLanguage).toggleClass(classes.visible);
    });
  };

  return {
    init: _initialize,
  };
	
})();

// Initialize
$(function() {
  Language.init();
});

