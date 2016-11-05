(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['LoginService'];

    function MainController(LoginService) {
        var vm = this;
        vm.working = false;
        vm.HeaderText = "App Abstract";
        vm.FooterText = "App Abstract Footer";
        vm.UserName = LoginService.getAuthentication().UserName;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////


    }

}());