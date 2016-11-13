(function () {
    'use strict';
    angular
        .module('app')
        .factory('InterceptorHelper', InterceptorHelper);

    InterceptorHelper.$inject = ['$location', '$q', 'AuthHelper'];

    function InterceptorHelper($location, $q, AuthHelper) {
        var helper = {
            request: request,
            responseError: responseError
        };

        return helper;

        //////////////////////////////////////////////////////////////////////////

        function request(config) {

            config.headers = config.headers || {};

            var authData = AuthHelper.getAuthentication();
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.Token;
            }

            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                AuthHelper.cleanAuthentication();
                $location.path('login');
            }
            return $q.reject(rejection);
        }
    }

}());