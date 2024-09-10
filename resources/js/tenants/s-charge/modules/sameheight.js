import debounce from '@/global/vendor/debounce';

var SameHeight = (function() {

	// selectors
	var selectors = {
    html:  'html',
    body:  'body',
    items: '[data-match-height]',
    items1: '[data-match-height-1]',
	};

  var mq = {
    sm: window.matchMedia("(min-width: 768px)"),
  };

  var _initialize = function() {
    _update();

    $(window).on('resize', function(){
      _update();
    });
  };

  var _update = debounce(function() {

    if (mq.sm.matches) {
      var els = $(selectors.items);
      els = jQuery.map(els, function(a) {
        return $(a).outerHeight();
      });
      $(selectors.items).css('min-height', Math.max(...els));
    }
    else {
      $(selectors.items).css('min-height', 'auto');
    }

    if (mq.sm.matches) {
      var els = $(selectors.items1);
      els = jQuery.map(els, function(a) {
        return $(a).outerHeight();
      });
      $(selectors.items1).css('min-height', Math.max(...els));
    }
    else {
      $(selectors.items1).css('min-height', 'auto');
    }



  }, 5);
  
  /* --------------------------------------------------------------
  * RETURN PUBLIC METHODS
  * ------------------------------------------------------------ */
        
  return {
    init: _initialize,
  };

})();

// Initialize
$(function() {
  SameHeight.init();
});