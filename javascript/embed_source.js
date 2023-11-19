(function () {
    const serviceFinderToolTitle = "Home - Service Finder";
    const serviceFinderToolUrl = "https://d2mr1k8kix77a1.cloudfront.net/";
    const wrapperElementId = "service-finder-tool";
    let openTriggerElement;

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
        frameElement.style.border = 'none';
        frameElement.style.width = '90%';
        frameElement.style.height = '90%';
        frameElement.style.position = 'absolute';
        frameElement.style.top = '5%';
        frameElement.style.left = '5%';

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

    window.addEventListener("message", (event) => {
        if (event.data === 'closeServiceFinderTool') {
            window.closeServiceFinderTool();
        }
    });
})();
