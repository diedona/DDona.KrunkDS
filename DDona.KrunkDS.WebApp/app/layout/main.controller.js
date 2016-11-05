(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthHelper'];

    function MainController(AuthHelper) {
        var vm = this;
        vm.working = false;
        vm.HeaderText = "App Abstract";
        vm.FooterText = "App Abstract Footer";
        vm.authentication = {};

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            vm.authentication = AuthHelper.getAuthentication();
        }

        //////////////////////////////////////////////////////////////////////////


    }

}());