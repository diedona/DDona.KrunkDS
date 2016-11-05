(function () {
    'use strict';
    angular
        .module('app')
        .factory('AuthHelper', AuthHelper);

    AuthHelper.$inject = [];

    function AuthHelper() {
        var helper = {
            isLoggedIn: isLoggedIn
        };

        return helper;

        //////////////////////////////////////////////////////////////////////////

        function isLoggedIn() {

        }
    }

}());