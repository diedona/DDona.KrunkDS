(function () {
    'use strict';
    angular
        .module('app')
        .factory('ProfileService', ProfileService);

    ProfileService.$inject = ['$http', 'SettingsHelper'];

    function ProfileService($http, SettingsHelper) {
        var service = {
            getFullProfile: getFullProfile,
            updateReceiveNotification: updateReceiveNotification,
            updateProfilePicture: updateProfilePicture,
            getLoggedUserPhoto: getLoggedUserPhoto
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function getFullProfile(obj) {
            var promise = null;
            promise = $http.get(SettingsHelper.BaseUrl + 'api/User/').then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            )
            return promise;
        }

        function updateReceiveNotification(Status) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/User/UpdateReceiveNotification/?Status=' + Status).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            )
            return promise;
        }

        function updateProfilePicture(obj) {
            var promise = null;
            promise = $http.put(SettingsHelper.BaseUrl + 'api/User/UpdateProfilePicture', obj).then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            )
            return promise;
        }

        function getLoggedUserPhoto() {
            var promise = null;
            promise = $http.get(SettingsHelper.BaseUrl + 'api/User/GetLoggedUserPhoto').then(
                function (response) { return response.data; },
                function (err) { console.log(err); return undefined; }
            )
            return promise;
        }
    }

}());