(function () {
    'use strict';

    angular
        .module('app.core', [
            'app.settings',

            'ui.router',
            'ui.bootstrap',
            'angularValidator',
            'LocalStorageModule',
            'oitozero.ngSweetAlert',
            'ng.httpLoader',
            'datatables',
            'datatables.options',
            'ui.utils.masks',
            'ngFileUpload'
        ]);        
}());