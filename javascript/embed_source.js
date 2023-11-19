(function () {
    const serviceFinderToolTitle = "Home - Service Finder";
    const serviceFinderToolUrl = "https://d2mr1k8kix77a1.cloudfront.net/";
    const wrapperElementId = "service-finder-tool";
    const resizeThrottle = 125; // millisecond
    let openTriggerElement;
    let resizeTimeout;

    (window.openServiceFinderTool = (openEvent) => {
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
    }),

    // As per design by Dentsu, the iframe popup of the tool should have different width by different browser width:
    // when browser is less than or equal to 700px, the popup should be full-width
    // when browser is less than or equal to 1024px but more than 700px, the popup has a fixed width of 700px
    // when browser is less than or equal to 1800px  but more than 1024px, the popup has a fixed padding 32px on each side
    // when browser is more than 1800px, the popup has fixed width of 1700px
    (window.getEmbeddedWidthAndLeftByBrowserWidth = (browserWidth) => {
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
    }),

    (window.closeServiceFinderTool = () => {
        document.querySelector('body').style.overflow = '';

        const wrapperElement = document.getElementById(wrapperElementId);

        if (wrapperElement instanceof Element) {
            wrapperElement.remove();

            // Focus back on the element which opened the tool to avoid the user's focus being at the end of the body tag
            if (openTriggerElement instanceof Element) {
                openTriggerElement.focus();
            }
        }
    }),

    (window.initServiceFinderTool = (selector = ".js-service-finder-tool-trigger") => {
        const triggerElements = document.querySelectorAll(selector);

        // Breakout if no elements are found
        if (!triggerElements.length) {
            return;
        }

        triggerElements.forEach((el) => {
            el.addEventListener('click', window.openServiceFinderTool);
        });
    }),

    document.addEventListener("DOMContentLoaded", () => {
        window.initServiceFinderTool();
    }),

    (window.adjustIFramePopupWidthAndPosition = () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            const frameElement = document.getElementById('sft-embedded');

            if (frameElement) {
                const widthAndLeft = window.getEmbeddedWidthAndLeftByBrowserWidth(window.innerWidth);

                frameElement.style.width = widthAndLeft.widthExpression;
                frameElement.style.left = widthAndLeft.leftExpression;
            }
        }, resizeThrottle);
    }),

    window.addEventListener('resize', window.adjustIFramePopupWidthAndPosition, false);

    window.addEventListener("message", (event) => {
        if (event.data === 'closeServiceFinderTool') {
            window.closeServiceFinderTool();
        }
    });
})();
