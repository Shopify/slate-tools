/* eslint-disable */

/*******************************************************************************
 * Development Script
 *
 * This script is only included on the page when Browsersync is being used. It's
 * a great place to put any customizations that you only want to occur while
 * developing your theme.
 ******************************************************************************/


/**
 * Persistent Preview Bar Minimize
 *
 * Adds a token to sessionStorage when the 'minimize' button is clicked on the
 * preview bar that appears when previewing an unpublished theme. This token is
 * checked for on subsequent page loads, and if found, the preview is hidden.
 */

(function() {
  if (!isLocalStorageSupported) { return; }

  window.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', onButtonClick);

    if (window.sessionStorage.getItem('hide-preview')) {
      hidePreviewBar();
    }
  })

  function onButtonClick(event) {
    var element = event.target;

    if (element.className.indexOf('shopify-preview-bar__minimize') === -1) { return; }

    window.sessionStorage.setItem('hide-preview', 'true');
    hidePreviewBar();
    document.removeEventListener('click', onButtonClick);
  }

  function hidePreviewBar() {
    addCSS('.shopify-preview-bar { display:none; }');
  }

  function addCSS(css){
    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.setAttribute('type', 'text/css');

    if (style.styleSheet) {   // IE
      style.styleSheet.cssText = css;
    } else {                // Everything else
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function isLocalStorageSupported () {
    var mod = 'modernizr';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
})();
/* eslint-enable */
