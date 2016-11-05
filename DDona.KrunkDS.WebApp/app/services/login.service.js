(function () {
    'use strict';
    angular
        .module('app')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', 'SettingsHelper', 'AuthHelper'];

    function LoginService($http, $q, SettingsHelper, AuthHelper) {
        var defaultAuth = {
            UserName: "",
            Token: "",
            IsAuth: false
        };

        var authentication = defaultAuth;

        var service = {
            login: login,
            logout: logout,
            fillAuthData: fillAuthData
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

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

                    AuthHelper.setAuthentication(authentication);
                    deferred.resolve(response);

            }).error(function (err, status) {
                logout();
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {
            AuthHelper.cleanAuthentication();
            authentication = defaultAuth;
        }

        function fillAuthData() {
            var authData = AuthHelper.getAuthentication();
            if (authData) {
                authData.IsAuth = true;
                authentication = authData;
            }
        }
    }
}());