(function () {
    'use strict';
    angular
        .module('app')
        .factory('SettingsService', SettingsService);

    SettingsService.$inject = ['$http', 'SettingsHelper'];

    function SettingsService($http, SettingsHelper) {
        var service = {
            saveSettings: saveSettings,
            updateSettings: updateSettings,
            deleteSettings: deleteSettings
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function saveSettings(obj) {
            var promise = null;
            promise = $http.post(SettingsHelper.BaseUrl + 'api/Settings', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function updateSettings(obj) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/Settings', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function deleteSettings(obj) {
            var promise = null;
            promise = $http.delete(SettingsHelper.BaseUrl + 'api/Settings/' + obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }
    }

}());