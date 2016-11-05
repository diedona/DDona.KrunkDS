(function () {
    'use strict';
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'SettingsHelper'];

    function UserService($http, SettingsHelper) {
        var service = {
            
        };

        return service;

        //////////////////////////////////////////////////////////////////////////        

    }

}());