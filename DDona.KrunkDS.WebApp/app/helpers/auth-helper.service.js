(function () {
    'use strict';
    angular
        .module('app')
        .factory('AuthHelper', AuthHelper);

    AuthHelper.$inject = ['localStorageService'];

    function AuthHelper(localStorageService) {
        var helper = {
            getAuthentication: getAuthentication,
            setAuthentication: setAuthentication,
            cleanAuthentication: cleanAuthentication
        };

        return helper;

        //////////////////////////////////////////////////////////////////////////

        function getAuthentication() {
            return localStorageService.get('authorizationData');
        }

        function setAuthentication(obj) {
            localStorageService.set('authorizationData', obj);
        }

        function cleanAuthentication() {
            localStorageService.remove('authorizationData');
        }
    }

}());