(function () {
    'use strict';
    angular
        .module('app')
        .factory('RoleService', RoleService);

    RoleService.$inject = ['$http', 'SettingsHelper'];

    function RoleService($http, SettingsHelper) {
        var service = {
            getAll: getAll
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function getAll() {
            var promise = null;
            promise = $http.get(SettingsHelper.BaseUrl + 'api/Role').then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }
    }

}());