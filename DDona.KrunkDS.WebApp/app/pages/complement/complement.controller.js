(function () {
    'use strict';
    angular
        .module('app')
        .controller('ComplementController', ComplementController);

    ComplementController.$inject = ['DTOptionsBuilder', 'DTColumnBuilder', 'SettingsHelper', 'AuthHelper',
        '$scope', '$compile', '$filter', 'ComplementService', 'NotificationService'];
    
    function ComplementController(DTOptionsBuilder, DTColumnBuilder, SettingsHelper, AuthHelper,
        $scope, $compile, $filter, ComplementService, NotificationService) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.dataTable = {};
        vm.complement = undefined;

        vm.search = search;
        vm.showDetailsToCreate = showDetailsToCreate;
        vm.cancel = cancel;
        vm.submitForm = submitForm;
        vm.showDetailsToEdit = showDetailsToEdit;
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

        function submitForm() {
            if (vm.complement.Id === undefined) {
                save();
            } else {
                update();
            }
        }

        function save() {
            vm.working = true;
            ComplementService.saveComplement(vm.complement).then(function (d) {
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
            ComplementService.updateComplement(vm.complement).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao atualizar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados atualizados com sucesso');
                    vm.dataTable.reloadData(function () { }, false);
                    vm.cancel();
                }
            });
        }

        function showDetailsToEdit(complement) {
            var copyComplement = JSON.parse(JSON.stringify(complement));
            vm.complement = copyComplement;
            vm.tabIndex = 1;
            vm.showDetails = true;
        }

        function confirmDelete() {
            NotificationService.confirmDelete(deleteComplement);
        }

        function deleteComplement() {
            vm.working = true;
            ComplementService.deleteComplement(vm.complement.Id).then(function (d) {
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