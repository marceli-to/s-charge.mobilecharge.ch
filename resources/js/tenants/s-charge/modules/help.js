import debounce from '@/global/vendor/debounce';

var Help = (function() {
	
	// selectors
	var selectors = {
    html:    'html',
    body:    'body',
    wrap:    '.js-help',
    btnNext: '.js-btn-next',
    btnPrev: '.js-btn-prev',
    btnVendor: '.js-btn-vendor',
	};

  var step = 1;
  var vendor = '';

  // css classes
  var classes = {
    visible:  'is-visible',
    hidden:   'is-hidden',
    selected: 'is-selected',
    disabled: 'is-disabled'
  };

  // Init
  var _initialize = function() {
    _bind();
    _setHeight();
  };

  // Bind events
  var _bind = function() {

    $(window).on('resize', function(){
      _setHeightResize();
    });

    if (window.location.hash) {
      var vendor = window.location.hash.substring(1);
      step = 2;
      $('[data-vendor-item]').hide();
      $('[data-vendor-item="'+vendor+'"]').show();

      let articles = document.querySelectorAll('article[data-step]');
      articles.forEach(element => {
        element.classList.remove(classes.visible);
      });

      let article = document.querySelector('article[data-step="'+step+'"]');
      article.classList.add(classes.visible);
      _scroll();
    }

    $(selectors.body).on('click', selectors.btnVendor, function(){
      vendor = $(this).data('vendor');
      let vendorBtns = document.querySelectorAll(selectors.btnVendor);
      vendorBtns.forEach(element => {
        element.classList.remove(classes.selected);
      });
      $(this).addClass(classes.selected);
      $(selectors.btnNext).removeClass(classes.disabled);

      // show all vendor items
      $('[data-vendor-item]').hide();
      $('[data-vendor-item="'+vendor+'"]').show();

    });

    $(selectors.body).on('click', selectors.btnNext, function(){
      step++;

      let articles = document.querySelectorAll('article[data-step]');

      articles.forEach(element => {
        element.classList.remove(classes.visible);
      });

      let article = document.querySelector('article[data-step="'+step+'"]');
      article.classList.add(classes.visible);
      _setHeight();
      _stopVideo();
      _scroll();
    });

    $(selectors.body).on('click', selectors.btnPrev, function(){
      step--;
      
      let articles = document.querySelectorAll('article[data-step]');
      articles.forEach(element => {
        element.classList.remove(classes.visible);
      });

      let article = document.querySelector('article[data-step="'+step+'"]');
      article.classList.add(classes.visible);
      _setHeight();
      _stopVideo();
      _scroll();
    });

  };

  var _setHeightResize = debounce(function() {
    $(selectors.wrap).height($('[data-step="'+step+'"]').height());
  }, 5);

  var _setHeight = function() {
    $(selectors.wrap).height($('[data-step="'+step+'"]').height());
  };

  var _stopVideo = function () {
    var videos = document.querySelectorAll('iframe, video');
    Array.prototype.forEach.call(videos, function (video) {
      if (video.tagName.toLowerCase() === 'video') {
        video.pause();
      } else {
        var src = video.src;
        video.src = src;
      }
    });
  };

  var _scroll = function() {
    setTimeout(function() {
      $(selectors.body).scrollTo(selectors.wrap, 400);
    }, 250);
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
  Help.init();
});

