(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = [];

    function LoginController() {
        var vm = this;
        vm.working = false;
        vm.user = {};

        vm.submitForm = submitForm;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////

        function submitForm() {
            console.log(vm.user);
        }
    }

}());