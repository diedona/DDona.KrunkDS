(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['SettingsHelper', 'DTOptionsBuilder', 'DTColumnBuilder',
        'AuthHelper', '$compile', '$scope'];

    function UserController(SettingsHelper, DTOptionsBuilder, DTColumnBuilder,
        AuthHelper, $compile, $scope) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.value = "";
        vm.dataTable = {};

        vm.search = search;
        vm.detailsUser = detailsUser;

        vm.dtOptions = dtOptions();
        vm.dtColumns = dtColumns();

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            
        }

        //////////////////////////////////////////////////////////////////////////

        function search() {
            vm.dataTable.reloadData();
        }

        function detailsUser(Id) {
            console.log(Id);
        }

        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: SettingsHelper.BaseUrl + 'api/User/DataTables',
                    type: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + AuthHelper.getAuthentication().Token
                    },
                    data: function (d) {
                        d.value = vm.value;
                    }
                })
                .withOption('createdRow', function (row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
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
                DTColumnBuilder.newColumn('Email').withTitle('E-Mail'),
                DTColumnBuilder.newColumn('IsActive').withTitle('Ativo')
                    .renderWith(function (data, type, full) {
                        if (data) {
                            return "<span class='label label-success'>Ativo</span>";
                        } else {
                            return "<span class='label label-default'>Inativo</span>";
                        }
                    }),
                //DTColumnBuilder.newColumn('Actions').withTitle('').notSortable()
                //    .renderWith(function (data, type, full) {
                //        return "<button class='btn btn-default' ng-click='userCtrl.detailsUser("+full.Id+");'>Ver</button>";
                //    })
            ];
        }
    }

}());