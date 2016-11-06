(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder'];

    function UserController(DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;

        vm.dtOptions = dtOptions();
        vm.dtColumnDefs = dtColumnDefs();

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder.newOptions()
                .withPaginationType('full_numbers')
                .withDOM('lrtip');
        }

        function dtColumnDefs() {
            return [];
        }
    }

}());