var Touch = (function() {
	
	// selectors
	var selectors = {
    body: 'body',
    btn:  '.js-video-btn',
    video: '.js-video'
	};

  // Init
  var _initialize = function() {
    _bind();
  };

  // Bind events
  var _bind = function() {
    $('body').on('click', selectors.btn, function(e) {
      $(this).parents('figure').remove();
      $(selectors.video).show();
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

