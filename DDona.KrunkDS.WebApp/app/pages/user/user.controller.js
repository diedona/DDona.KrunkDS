(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = [];

    function UserController() {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////

    }

}());