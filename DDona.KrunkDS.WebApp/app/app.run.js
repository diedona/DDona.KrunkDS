(function () {
    'use strict';
    angular
        .module('app')
        .run(run);

    run.$inject = ['LoginService'];

    function run(LoginService) {
        LoginService.fillAuthData();
    }

}());