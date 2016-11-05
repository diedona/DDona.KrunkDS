(function () {
    'use strict';
    angular
        .module('app')
        .controller('HelpController', HelpController);

    HelpController.$inject = [];

    function HelpController() {
        var vm = this;
        this.working = false;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////

    }

}());