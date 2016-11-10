(function () {
    'use strict';
    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', 'SettingsHelper', 'AuthHelper',
        '$compile', '$scope', '$filter', 'NotificationService', 'SettingsService'];

    function SettingsController(DTOptionsBuilder, DTColumnBuilder, SettingsHelper, AuthHelper,
        $compile, $scope, $filter, NotificationService, SettingsService) {

        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.dataTable = {};

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
                    url: SettingsHelper.BaseUrl + 'api/Settings/DataTables',
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
                .withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers')
                .withDOM('lrtip')
        }

        function dtColumns() {
            return [
                DTColumnBuilder.newColumn('Module').withTitle('Módulo'),
                DTColumnBuilder.newColumn('Key').withTitle('Chave'),
                DTColumnBuilder.newColumn('Value').withTitle('Valor'),
                DTColumnBuilder.newColumn('CreateDate').withTitle('Dt. Criação')
                    .renderWith(function (data, type, full) {
                        return $filter('date')(data, 'customDate');
                    })
            ];
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                $scope.$apply(function () {
                    //vm.showDetailsToEdit(aData);
                });
            });
            return nRow;
        }
    }

}());