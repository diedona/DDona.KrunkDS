(function () {
    'use strict';
    angular
        .module('app')
        .controller('LogOutController', LogOutController);

    LogOutController.$inject = ['LoginService', '$state'];

    function LogOutController(LoginService, $state) {
        var vm = this;
        vm.working = false;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            LoginService.logout();
            $state.go('login');
        }

        //////////////////////////////////////////////////////////////////////////
    }

}());