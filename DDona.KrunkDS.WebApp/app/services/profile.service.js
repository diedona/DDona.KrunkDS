(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http', 'SettingsHelper'];

    function ProfileService($http, SettingsHelper) {
        var service = {
            getFullProfile: getFullProfile
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function getFullProfile(obj) {
            var promise = null;
            promise = $http.get(SettingsHelper.BaseUrl + 'api/Profile/' + obj);
            return promise;
        }
    }

}());