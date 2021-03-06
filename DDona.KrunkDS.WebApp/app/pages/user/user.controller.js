﻿(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['SettingsHelper', 'DTOptionsBuilder', 'DTColumnBuilder',
        'AuthHelper', '$compile', '$scope', 'RoleService', 'NotificationService', 'UserService'];

    function UserController(SettingsHelper, DTOptionsBuilder, DTColumnBuilder,
        AuthHelper, $compile, $scope, RoleService, NotificationService, UserService) {
        var vm = this;
        vm.working = false;
        vm.tabIndex = 0;
        vm.showDetails = false;
        vm.value = "";
        vm.dataTable = {};
        vm.user = undefined;
        vm.roles = [];

        vm.search = search;
        vm.cancel = cancel;
        vm.showDetailsToCreate = showDetailsToCreate;
        vm.showDetailsToEdit = showDetailsToEdit;
        vm.submitForm = submitForm;
        vm.confirmDelete = confirmDelete;

        vm.dtOptions = dtOptions();
        vm.dtColumns = dtColumns();

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

        function search() {
            vm.dataTable.reloadData();
        }

        function cancel() {
            vm.tabIndex = 0;
            vm.showDetails = false;
            vm.user = undefined;
        }

        function showDetailsToCreate() {
            vm.tabIndex = 1;
            vm.showDetails = true;
            vm.user = {
                IsActive: true,
                ReceiveNotification: false
            };
        }

        function showDetailsToEdit(user) {
            vm.tabIndex = 1;
            vm.showDetails = true;
            vm.user = user;
        }

        function submitForm() {
            if (vm.user.Id === undefined) {
                save();
            } else {
                update();
            }
        }

        function save() {
            vm.working = true;
            UserService.saveUser(vm.user).then(function (d) {
                vm.working = false;
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao salvar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados salvos com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            })
        }

        function update() {
            vm.working = true;
            UserService.updateUser(vm.user).then(function (d) {
                vm.working = false;
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao atualizar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados atualizados com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            })
        }

        function confirmDelete() {
            NotificationService.confirmDelete(deleteUser);
        }

        function deleteUser() {
            vm.working = true;
            UserService.deleteUser(vm.user.Id).then(function (d) {
                vm.working = false;
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao deletar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados deletados com sucesso');
                    vm.cancel();
                    vm.dataTable.reloadData(function () { }, false);
                }
            })
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
                .withOption('rowCallback', rowCallback)
                .withPaginationType('full_numbers')
                .withDOM('lrtip')
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $('td', nRow).unbind('click');
            $('td', nRow).bind('click', function () {
                $scope.$apply(function () {
                    //avoiding mixing grid
                    var aDataCopy = JSON.parse(JSON.stringify(aData))
                    vm.showDetailsToEdit(aDataCopy);
                });
            });
            return nRow;
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