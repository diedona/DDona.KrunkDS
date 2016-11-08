(function () {
    'use strict'
    angular
        .module('app')
        .controller('CupController', CupController);

    CupController.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', 'SettingsHelper', 'AuthHelper',
        '$compile', '$scope', '$filter'];

    function CupController(DTOptionsBuilder, DTColumnBuilder, SettingsHelper, AuthHelper,
        $compile, $scope, $filter) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.value = "";
        vm.dataTable = {};

        vm.search = search;

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

        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: SettingsHelper.BaseUrl + 'api/Cup/DataTables',
                    type: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + AuthHelper.getAuthentication().Token
                    },
                    data: function (d) {
                        d.value = vm.value;
                        d.valueDecimal = vm.valueDecimal;
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
                DTColumnBuilder.newColumn('Description').withTitle('Descrição'),
                DTColumnBuilder.newColumn('Price').withTitle('Preço')
                    .renderWith(function (data) {
                        return $filter('number')(data, 2);
                    }),
                DTColumnBuilder.newColumn('IsActive').withTitle('Ativo')
                    .renderWith(function (data, type, full) {
                        if (data) {
                            return "<span class='label label-success'>Ativo</span>";
                        } else {
                            return "<span class='label label-default'>Inativo</span>";
                        }
                    }),
            ];
        }
    }

}());