var Menu = (function() {
	
	// selectors
	var selectors = {
    html:    'html',
    body:    'body',
    menu:    '.js-menu',
    menuBtn: '.js-menu-btn',
    contactBtn: '.js-contact-btn',
	};

  // css classes
  var classes = {
    visible:  'is-visible',
    hidden:   'is-hidden',
  };

  // Init
  var _initialize = function() {
    _bind();
  };

  // Bind events
  var _bind = function() {
    $(selectors.body).on('click', selectors.menuBtn, function(){
      _toggle($(this));
    });

    $(selectors.body).on('click', selectors.contactBtn, function(){
      _hide();
      let el = document.querySelector('.site-footer');
      el.scrollIntoView({block: "end", behavior: "smooth"});
    });
  };

  var _toggle = function() {
    $(selectors.menu).toggleClass(classes.visible);
  };

  var _hide = function() {
    $(selectors.menu).removeClass(classes.visible);
  };

  /* --------------------------------------------------------------
    * RETURN PUBLIC METHODS
    * ------------------------------------------------------------ */

  return {
    init:  _initialize,
  };
	
})();

// Initialize
$(function() {
  Menu.init();
});

