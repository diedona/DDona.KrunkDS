(function () {
    'use strict';
    angular
        .module('app')
        .factory('ComplementService', ComplementService);

    ComplementService.$inject = ['$http', 'SettingsHelper'];

    function ComplementService($http, SettingsHelper) {
        var service = {
            saveComplement: saveComplement,
            updateComplement: updateComplement,
            deleteComplement: deleteComplement
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function saveComplement(obj) {
            var promise = null;
            promise = $http.post(SettingsHelper.BaseUrl + 'api/Complement', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function updateComplement(obj) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/Complement', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function deleteComplement(obj) {
            var promise = null;
            promise = $http.delete(SettingsHelper.BaseUrl + 'api/Complement/' + obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }
    }

}());