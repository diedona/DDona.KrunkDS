﻿(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [];

    function ProfileController() {
        var vm = this;
        vm.working = false;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////

    }

}());