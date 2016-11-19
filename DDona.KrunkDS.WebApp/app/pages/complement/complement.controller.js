(function () {
    'use strict';
    angular
        .module('app')
        .controller('ComplementController', ComplementController);

    ComplementController.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', 'SettingsHelper', 'AuthHelper',
        '$scope', '$compile', '$filter'];
    
    function ComplementController(DTOptionsBuilder, DTColumnBuilder, SettingsHelper, AuthHelper,
        $scope, $compile, $filter) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.dataTable = {};
        vm.complement = undefined;

        vm.search = search;
        vm.showDetailsToCreate = showDetailsToCreate;
        vm.cancel = cancel;

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

        function showDetailsToCreate() {
            vm.tabIndex = 1;
            vm.showDetails = true;
            vm.complement = {
                IsActive: true
            };
        }

        function cancel() {
            vm.tabIndex = 0;
            vm.showDetails = false;
        }

        //////////////////////////////////////////////////////////////////////////

        function dtOptions() {
            return DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: SettingsHelper.BaseUrl + 'api/Complement/DataTables',
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
                .withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers')
                .withDOM('lrtip')
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
                    })
            ];
        }
    }

}());