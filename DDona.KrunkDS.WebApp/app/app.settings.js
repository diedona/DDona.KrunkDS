﻿(function () {
    'use strict';
    angular
        .module('app.settings', [])
        .factory('SettingsHelper', SettingsHelper);

    SettingsHelper.$inject = [];

    function SettingsHelper() {
        var service = {
            BaseUrl: 'http://localhost:49972/'
        };

        return service;
    }
}());