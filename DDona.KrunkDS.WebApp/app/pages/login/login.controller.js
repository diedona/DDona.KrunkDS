(function () {
    'use strict';
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'LoginService', 'NotificationService', '$scope', 'AuthHelper'];

    function LoginController($location, LoginService, NotificationService, $scope, AuthHelper) {
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
                //updates auth in main
                $scope.mainCtrl.authentication = AuthHelper.getAuthentication();
                //updates pic
                $scope.mainCtrl.getPhoto();
            }, function (err) {
                NotificationService.error('Ops...', 'Login inválido');
            });
        }
    }

}());