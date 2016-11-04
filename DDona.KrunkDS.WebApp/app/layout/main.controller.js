(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = [];

    function MainController() {
        var vm = this;
        vm.working = false;
        vm.HeaderText = "App Abstract";
        vm.FooterText = "App Abstract Footer";

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////


    }

}());