(function() {
    const serviceFinderToolTitle = 'Home - Service Finder';
    const serviceFinderToolUrl = 'https://sft.org.nz/';
    const wrapperElementId = 'service-finder-tool';
    let openTriggerElement;
    let resizeTimeout;
    const resizeThrottle = 125; // millisecond

    /**
     * Opens the Service Finder Tool, adding additional elements to the end of the body with modal styling
     * @param {Event} openEvent - optional
     */
    window.openServiceFinderTool = (openEvent) => {
      if (openEvent) {
        openTriggerElement = openEvent.target;
        openEvent.preventDefault();
      }

      // If the Service Finder Tool is already open then focus on the existing tool rather than create a new one
      const existingWrapperEl = document.getElementById(wrapperElementId);
      if (existingWrapperEl instanceof Element) {
        existingWrapperEl.focus();
        return;
      }

      const wrapperElement = document.createElement('div');
      wrapperElement.id = wrapperElementId;
      wrapperElement.tabIndex = '-1';
      wrapperElement.style.position = 'fixed';
      wrapperElement.style.top = 0;
      wrapperElement.style.left = 0;
      wrapperElement.style.right = 0;
      wrapperElement.style.bottom = 0;
      wrapperElement.style.zIndex = 9999;

      const overlayElement = document.createElement('div');
      overlayElement.style.background = 'rgba(0, 0, 0, 0.6)';
      overlayElement.style.position = 'absolute';
      overlayElement.style.top = 0;
      overlayElement.style.left = 0;
      overlayElement.style.right = 0;
      overlayElement.style.bottom = 0;

      const frameElement = document.createElement('iframe');
      frameElement.setAttribute('src', serviceFinderToolUrl);
      frameElement.setAttribute('title', serviceFinderToolTitle);
      frameElement.setAttribute('id', 'sft-embedded');
      frameElement.style.border = 'none';

      const widthAndLeft = window.getEmbeddedWidthAndLeftByBrowserWidth(window.innerWidth);
      frameElement.style.width = widthAndLeft.widthExpression;
      frameElement.style.height = '90%';
      frameElement.style.position = 'absolute';
      frameElement.style.top = '5%';
      frameElement.style.left = widthAndLeft.leftExpression;

      overlayElement.addEventListener('click', window.closeServiceFinderTool);
      wrapperElement.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          window.closeServiceFinderTool();
        }
      });

      wrapperElement.appendChild(overlayElement);
      overlayElement.appendChild(frameElement);

      document.querySelector('body').appendChild(wrapperElement);
      document.querySelector('body').style.overflow = 'hidden';

      wrapperElement.focus();
    };

    window.getEmbeddedWidthAndLeftByBrowserWidth = (browserWidth) => {
      let widthExpression;
      let leftExpression;

      if (browserWidth > 1800) {
        widthExpression = '1700px';
        leftExpression = `${(50 * (browserWidth - 1700)) / browserWidth}%`;
      } else if (browserWidth > 1024) {
        widthExpression = `calc(100% - 64px)`;
        leftExpression = '32px';
      } else if (browserWidth > 700) {
        widthExpression = '700px';
        leftExpression = `${(50 * (browserWidth - 700)) / browserWidth}%`;
      } else {
        widthExpression = '100%';
        leftExpression = 0;
      }

      return { widthExpression, leftExpression };
    };

    /**
     * Closes the Service Finder Tool, removing all elements from the DOM
     */
    window.closeServiceFinderTool = () => {
      document.querySelector('body').style.overflow = '';

      const wrapperElement = document.getElementById(wrapperElementId);

      if (wrapperElement instanceof Element) {
        wrapperElement.remove();

        // Focus back on the element which opened the tool to avoid the user's focus being at the end of the body tag
        if (openTriggerElement instanceof Element) {
          openTriggerElement.focus();
        }
      }
    };

    /**
     * Initialises listeners for buttons or other elements that will open the Service Finder Tool
     * @param {string} selector - Optionally pass in a CSS selector to attach the open listener(s) to
     */
    window.initServiceFinderTool = (selector = '.js-service-finder-tool-trigger') => {
      const triggerElements = document.querySelectorAll(selector);

      // Breakout if no elements are found
      if (!triggerElements.length) {
        return;
      }

      triggerElements.forEach((el) => {
        el.addEventListener('click', window.openServiceFinderTool);
      });
    };

    // Initialise the tool after DOM is loaded to prevent initiailising before relevant elements are rendered
    document.addEventListener('DOMContentLoaded', () => {
      window.initServiceFinderTool();
    });

    window.adjustIFramePopupWidthAndPosition = () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const frameElement = document.getElementById('sft-embedded');

        if (frameElement) {
          const widthAndLeft = window.getEmbeddedWidthAndLeftByBrowserWidth(window.innerWidth);

          frameElement.style.width = widthAndLeft.widthExpression;
          frameElement.style.left = widthAndLeft.leftExpression;
        }
      }, resizeThrottle);
    };

    window.addEventListener('resize', window.adjustIFramePopupWidthAndPosition, false);

    /**
     * Attach a listener to the window to receive messages from the Service Finder Tool in order to close the tool
     */
    window.addEventListener('message', (event) => {
      if (event.data === 'closeServiceFinderTool') {
        window.closeServiceFinderTool();
      }

      if (event.data === 'exitSiteSafely') {
        window.location.replace('https://www.stuff.co.nz');
      }
    });
})();
