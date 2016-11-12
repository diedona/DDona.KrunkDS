(function () {
    'use strict';
    angular
        .module('app')
        .controller('RoleController', RoleController);

    RoleController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'RoleService',
        'NotificationService'];

    function RoleController(DTOptionsBuilder, DTColumnDefBuilder, RoleService,
        NotificationService) {

        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.dataTable = {};
        vm.roles = [];

        vm.dtOptions = dtOptions();
        vm.dtColumnDefs = dtColumnDefs();

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            RoleService.getAll().then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao carregar dados');
                } else {
                    vm.roles = d.ResultObjectList;
                }
            })
        }

        //////////////////////////////////////////////////////////////////////////



        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder
                .newOptions()
                .withDOM('lrtip')
                .withPaginationType('full_numbers');
        }

        function dtColumnDefs() {
            return [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
            ];
        }

    }
}());