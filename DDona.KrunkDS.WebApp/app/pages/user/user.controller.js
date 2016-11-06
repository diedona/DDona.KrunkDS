(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['SettingsHelper', 'DTOptionsBuilder', 'DTColumnBuilder', 'AuthHelper'];

    function UserController(SettingsHelper, DTOptionsBuilder, DTColumnBuilder, AuthHelper) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;

        vm.dtOptions = dtOptions();
        vm.dtColumns = dtColumns();

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////


        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: SettingsHelper.BaseUrl + 'api/User/DataTables',
                    type: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + AuthHelper.getAuthentication().Token
                    }
                })
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
                .withPaginationType('full_numbers')
                .withDOM('lrtip')
        }

        function dtColumns() {
            return [
                DTColumnBuilder.newColumn('UserName').withTitle('Nome de Usuário'),
                DTColumnBuilder.newColumn('IsActive').withTitle('Ativo'),
                DTColumnBuilder.newColumn('Actions').withTitle('').notSortable()
            ];
        }
    }

}());