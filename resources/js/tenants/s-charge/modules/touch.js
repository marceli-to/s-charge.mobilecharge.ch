var Touch = (function() {
	
	// selectors
	var selectors = {
    html: 'html',
    body: 'body',
	};

  // Init
  var _initialize = function() {
    _bind();
  };

  // Bind events
  var _bind = function() {
    $('a').on('touchstart', function(e) {
      $(this).addClass('is-touched');
    });
    $('a').on('touchend', function(e) {
      $(this).removeClass('is-touched');
    });
  };

  return {
    init: _initialize,
  };
	
})();

// Initialize
$(function() {
  Touch.init();
});

