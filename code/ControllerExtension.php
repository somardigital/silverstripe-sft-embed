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
    private static $use_remote_js = false;

    /**
     * If enabled then the JavaScript will be loaded on all pages
     * @config
     */
    private static bool $always_load_script = false;

    /**
     * @inheritDoc
     */
    public function onAfterInit()
    {
        // load the service finder tool for every page
        // this is helpful if the tool is included in a cached block
        if (Config::inst()->get(self::class, 'always_load_script')) {
            $this->requireCoreJS();
        }
    }

    /**
     * Outputs the trigger class that the SFT embed code binds to. Automatically ensures the JS is included on the page.
     *
     * @return string
     */
    public function getServiceFinderToolTrigger()
    {
        self::requireCoreJS();

        return 'js-service-finder-tool-trigger';
    }

    public static function requireCoreJS()
    {
        if (Config::inst()->get(self::class, 'use_remote_js')) {
             Requirements::javascript('https://d2mr1k8kix77a1.cloudfront.net/js/embed.js');
        } else {
            Requirements::javascript('somardesignstudios/silverstripe-sft-embed: javascript/embed.js');
        }
    }
}
