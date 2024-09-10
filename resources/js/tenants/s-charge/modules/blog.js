const Blog = (function() {
	
	// selectors
	const selectors = {
    body: 'body',
    select:  '.js-select-tag',
	};

  // Init
  const _initialize = function() {
    _bind();
  };

  // Bind events
  const _bind = function() {
    const select = document.querySelector(selectors.select);
    if (!select) return;
    select.addEventListener('change', function() {
      if (this.value === 'null') return window.location.href = '/blog';
      window.location.href = '/blog/' + this.value;
    });
  };

  return {
    init: _initialize,
  };
	
})();

// Initialize
$(function() {
  Blog.init();
});