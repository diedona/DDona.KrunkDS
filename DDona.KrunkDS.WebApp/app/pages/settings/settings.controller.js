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
        vm.showDetails = false;
        vm.settings = undefined;

        vm.search = search;
        vm.showDetailsToCreate = showDetailsToCreate;
        vm.showDetailsToEdit = showDetailsToEdit;
        vm.cancel = cancel;
        vm.submitForm = submitForm;
        vm.confirmDelete = confirmDelete;

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
            vm.settings = {};
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function showDetailsToEdit(settings) {
            vm.settings = settings;
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function cancel() {
            vm.settings = undefined;
            vm.tabIndex = 0;
            vm.showDetails = false;
        }

        function submitForm() {
            if (vm.settings.Id === undefined) {
                save();
            } else {
                update();
            }
        }

        function save() {
            vm.working = true;
            SettingsService.saveSettings(vm.settings).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao salvar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados salvos com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            });
        }

        function update() {
            vm.working = true;
            SettingsService.updateSettings(vm.settings).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao atualizar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados atualizados com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            });
        }

        function confirmDelete() {
            NotificationService.confirmDelete(deleteSettings);
        }

        function deleteSettings() {
            vm.working = true;
            SettingsService.deleteSettings(vm.settings.Id).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao deletar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados deletados com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            });
        }

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
                    vm.showDetailsToEdit(aData);
                });
            });
            return nRow;
        }
    }

}());