(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'LoginService', 'NotificationService'];

    function LoginController($location, LoginService, NotificationService) {
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
            LoginService.login(vm.user).then(function (response) {
                $location.path('/home');
            }, function (err) {
                NotificationService.error('Ops...', 'Login inválido');
            });
        }
    }

}());