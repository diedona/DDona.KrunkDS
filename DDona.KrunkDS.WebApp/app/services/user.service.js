(function () {
    'use strict';
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'SettingsHelper'];

    function UserService($http, SettingsHelper) {
        var service = {
            saveUser: saveUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return service;

        //////////////////////////////////////////////////////////////////////////        

        function saveUser(obj) {
            var promise = null;
            promise = $http.post(SettingsHelper.BaseUrl + 'api/User', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function updateUser(obj) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/User', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }

        function deleteUser(obj) {
            var promise = null;
            promise = $http.delete(SettingsHelper.BaseUrl + 'api/User/' + obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            );
            return promise;
        }
    }

}());