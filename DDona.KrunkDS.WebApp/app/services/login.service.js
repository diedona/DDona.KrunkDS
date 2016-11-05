(function () {
    'use strict';
    angular
        .module('app')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', 'localStorageService', 'SettingsHelper'];

    function LoginService($http, $q, localStorageService, SettingsHelper) {
        var defaultAuth = {
            UserName: "",
            Token: "",
            IsAuth: false
        };

        var authentication = defaultAuth;

        var service = {
            getAuthentication: getAuthentication,
            login: login,
            logout: logout,
            fillAuthData: fillAuthData
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function getAuthentication() {
            return authentication;
        }

        function login(obj) {
            var data = "grant_type=password&username=" + obj.UserName + "&password=" + obj.Password;
            var deferred = $q.defer();

            $http.post(SettingsHelper.BaseUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {

                    authentication = { 
                        Token: response.access_token, 
                        UserName: response.UserName,
                        IsAuth: true
                    };

                    localStorageService.set('authorizationData', authentication);

                    deferred.resolve(response);

            }).error(function (err, status) {
                logout();
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {
            localStorageService.remove('authorizationData');
            authentication = defaultAuth;
        }

        function fillAuthData() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication = authData;
            }
        }
    }
}());