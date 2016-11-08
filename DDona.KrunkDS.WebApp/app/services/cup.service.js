(function () {
    'use strict';
    angular
        .module('app')
        .factory('CupService', CupService);

    CupService.$inject = ['$http', 'SettingsHelper'];

    function CupService($http, SettingsHelper) {
        var service = {
            saveCup: saveCup,
            updateCup: updateCup,
            deleteCup: deleteCup
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function saveCup(obj) {
            var promise = null;
            promise = $http.post(SettingsHelper.BaseUrl + 'api/Cup', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function updateCup(obj) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/Cup', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function deleteCup(obj) {
            var promise = null;
            promise = $http.delete(SettingsHelper.BaseUrl + 'api/Cup/' + obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }
    }

}());