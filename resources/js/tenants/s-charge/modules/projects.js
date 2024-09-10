const Projects = (function() {
	
	// selectors
	const selectors = {
    html: 'html',
    body: 'body',
    select:  '.js-select-tag',
	};

  const i18n = {
    routes: {
      'en': 'projects',
      'fr': 'projets',
      'it': 'progetti',
      'de': 'projekte',
    }
  };

  // Get html lang
  const lang = $(selectors.html).attr('lang');


  // Init
  const _initialize = function() {
    _bind();
  };

  // Bind events
  const _bind = function() {
    const select = document.querySelector(selectors.select);
    if (!select) return;
    select.addEventListener('change', function() {
      if (this.value === 'null') return window.location.href = '/' + lang + '/' + i18n.routes[lang];
      window.location.href = '/' + lang + '/' + i18n.routes[lang] + '/' + this.value;
    });
  };

  return {
    init: _initialize,
  };
	
})();

// Initialize
$(function() {
  Projects.init();
});