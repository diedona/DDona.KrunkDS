(function () {
    'use strict';
    angular
        .module('app')
        .controller('RoleController', RoleController);

    RoleController.$inject = ['DTOptionsBuilder', 'DTColumnDefBuilder', 'RoleService',
        'NotificationService', '$scope'];

    function RoleController(DTOptionsBuilder, DTColumnDefBuilder, RoleService,
        NotificationService, $scope) {

        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.dataTable = {};
        vm.roles = [];
        vm.role = undefined;

        vm.showTabDetailsToEdit = showTabDetailsToEdit;
        vm.cancel = cancel;

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

        function showTabDetailsToEdit(role) {
            vm.role = role;
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function cancel() {
            vm.role = undefined;
            vm.tabIndex = 0;
            vm.showDetails = false;
        }

        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder
                .newOptions()
                .withDOM('lrtip')
                //.withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers');
        }

        function dtColumnDefs() {
            return [
                DTColumnDefBuilder.newColumnDef(0),
                DTColumnDefBuilder.newColumnDef(1),
            ];
        }

        //function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull){
        //    // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        //    $('td', nRow).unbind('click');
        //    $('td', nRow).bind('click', function() {
        //        $scope.$apply(function() {
        //            vm.showTabDetailsToEdit(aData);
        //        });
        //    });
        //    return nRow;
        //}

    }
}());