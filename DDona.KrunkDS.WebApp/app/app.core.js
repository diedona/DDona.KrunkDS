(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.settings',

            'ui.router',
            'ui.bootstrap',
            'angularValidator',
            'LocalStorageModule'
        ]);        
}());