# MSD Service Finder Tool Embed

This module facilitates the inclusion of the [Service Finder Tool](https://sft.org.nz) in a Silverstripe website.

# Usage

Include the module code with `composer require somardesignstudios/silverstripe-sft-embed`.

You can then bind buttons to the Service Finder Tool by adding the default trigger class (`.js-service-finder-tool-trigger`) to relevant elements via the template helper `$ServiceFinderToolTrigger`:

```html
<button class="$ServiceFinderToolTrigger">Open Service Finder Tool</button>
```

The `SomarDesignStudios\ServiceFinderTool\ControllerExtension` will inject the necessary Javascript into the page when the trigger is used.

## Cached content

The normal method will not work correctly if the element is wrapped with partial caching, in which case you will need to follow the steps below to trigger the injection manually.

### Via configuration

To force the JavaScript to load on every page; add a configuration file `service-finder-tool.yml` with the following

```yaml
---
Name: servicefindertool
Only:
  moduleexists: 'somardesignstudios/silverstripe-sft-embed'
---
SomarDesignStudios\ServiceFinderTool:
  always_load_script: true
```

### Via manual implementation

If you want to attach the trigger to an element manually (for example, if the target element does not exist in the DOM during page load):

- Call `SomarDesignStudios\ServiceFinderTool\ControllerExtension::requireCoreJS()` from your controller to inject the necessary Javascript
- Bind the tool to a button element by calling `window.initServiceFinderTool('<element-css-selector>')`

If you need to open the tool from your own Javascript, you can call `window.triggerServiceFinderTool()` directly, and you can close it by calling `window.closeServiceFinderTool()`.



## Security

This module can allow Javascript from a third-party source, and as such should be treated with a level of caution. Theoretically, this could change at any time. As a result, a copy of the Javascript has been included in the module, which will be periodically updated when the remote script is.

By default, the module will use the baked-in version of the Javascript. To shift to using the remote version, add the following to your config:

```yaml
SomarDesignStudios\ServiceFinderTool\ControllerExtension:
  use_remote_js: true
```

# Special Thanks

- [andrewandante/silverstripe-womens-refuge-shield](https://github.com/andrewandante/silverstripe-womens-refuge-shield) for the base module structure
