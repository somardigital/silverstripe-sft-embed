<?php

namespace SomarDesignStudios\ServiceFinderTool;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\Requirements;

/**
 * Class SomarDesignStudios\ServiceFinderTool\ControllerExtension
 *
 * @property ContentController $owner
 */
class ControllerExtension extends Extension
{
    /**
     * @var bool
     * @config
     */
    private static $enabled = true;

    /**
     * @var bool
     * @config
     */
    private static $use_remote_js = false;

    public function onBeforeInit()
    {
        if (Config::inst()->get(self::class, 'enabled')) {
            $this->requireCoreJS();
        }
    }

    /**
     * Outputs the trigger class that the SFT embed code binds to.
     *
     * @return string
     */
    public function getServiceFinderToolTrigger()
    {
        return 'js-service-finder-tool-trigger';
    }

    protected function requireCoreJS()
    {
        if (Config::inst()->get(self::class, 'use_remote_js')) {
            # TODO: Production URL
             Requirements::javascript('https://service-finder-tool.cloudfront.net/js/embed.js');
        } else {
            Requirements::javascript('somardesignstudios/silverstripe-sft-embed: javascript/embed.js');
        }
    }
}
