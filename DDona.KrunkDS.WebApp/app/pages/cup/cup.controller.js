(function () {
    'use strict'
    angular
        .module('app')
        .controller('CupController', CupController);

    CupController.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', 'SettingsHelper', 'AuthHelper',
        '$compile', '$scope', '$filter', 'NotificationService', 'CupService'];

    function CupController(DTOptionsBuilder, DTColumnBuilder, SettingsHelper, AuthHelper,
        $compile, $scope, $filter, NotificationService, CupService) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.value = "";
        vm.dataTable = {};
        vm.cup = {};

        vm.search = search;
        vm.showDetailsToCreate = showDetailsToCreate;
        vm.showDetailsToEdit = showDetailsToEdit;
        vm.cancel = cancel;
        vm.submitForm = submitForm;
        vm.confirmDelete = confirmDelete;
        vm.deleteCup = deleteCup;

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
            vm.cup = { IsActive: true };
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function showDetailsToEdit(cup) {
            vm.cup = cup;
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function cancel() {
            vm.cup = {};
            vm.tabIndex = 0;
            vm.showDetails = false;
        }

        function submitForm() {
            if (vm.cup.Id === undefined) {
                save();
            } else {
                update();
            }
        }

        function save() {
            vm.working = true;
            CupService.saveCup(vm.cup).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao salvar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados salvos com sucesso');
                    vm.dataTable.reloadData(function () { }, false);
                    vm.cancel();
                }
            });
        }

        function update() {
            vm.working = true;
            CupService.updateCup(vm.cup).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao atualizar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados atualizados com sucesso');
                    vm.dataTable.reloadData(function () { }, false);
                    vm.cancel();
                }
            });
        }

        function confirmDelete() {
            NotificationService.confirmDelete(deleteCup);
        }

        function deleteCup() {
            vm.working = true;
            CupService.deleteCup(vm.cup.Id).then(function (d) {
                vm.working = false;
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao deletar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados deletados com sucesso');
                    vm.dataTable.reloadData(function () { }, false);
                    vm.cancel();
                }
            });
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
                .withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers')
                .withDOM('lrtip')
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                $scope.$apply(function () {
                    vm.showDetailsToEdit(aData);
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