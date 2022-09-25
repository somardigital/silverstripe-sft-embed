# MSD Service Finder Tool Embed

This module facilitates the inclusion of the [Service Finder Tool](https://service-finder-tool.cloudfront.net) in a Silverstripe website.

# Installation

Include the module code with `composer require somardesignstudios/silverstripe-sft-embed` and enable it via config:

```yml
SomarDesignStudios\ServiceFinderTool\ControllerExtension:
  enabled: true
```

# Usage

After enabling the plugin in config, the `ServiceFinderTool\ControllerExtension` will inject the necessary Javascript into your pages.

You can then bind buttons to the Service Finder Tool by adding the default trigger class (`.js-service-finder-tool-trigger`) to relevant elements:

```html
<button class="$ServiceFinderToolTrigger">Open Service Finder Tool</button>
```

If you want to attach the trigger to an element manually (for example, if the target element does not exist in the DOM during page load), you can manually attach the open listeners to an element by calling `window.initServiceFinderTool('element-css-selector')`.

If you need to open the tool from your own Javascript, you can call `window.triggerServiceFinderTool()` directly, and you can close it by calling `window.closeServiceFinderTool()`.

## Security

This module can allow Javascript from a third-party source, and as such should be treated with a level of caution. Theoretically, this could change at any time. As a result, a copy of the Javascript has been included in the module, which will be periodically updated when the remote script is.

By default, the module will use the baked-in version of the Javascript. To shift to using the remote version, add the following to your site config:

```yaml
SomarDesignStudios\ServiceFinderTool\ControllerExtension:
  use_remote_js: true
```

# Special Thanks

- [andrewandante/silverstripe-womens-refuge-shield](https://github.com/andrewandante/silverstripe-womens-refuge-shield) for the base module structure
