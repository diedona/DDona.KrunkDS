(function () {
    'use strict';
    angular
        .module('app')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$uibModalInstance', 'ProfileService', 'NotificationService'];

    function ChangePasswordController($uibModalInstance, ProfileService, NotificationService) {
        var vm = this;
        vm.working = false;

        vm.closeModal = closeModal;
        vm.submitForm = submitForm;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {

        }

        //////////////////////////////////////////////////////////////////////////

        function closeModal() {
            $uibModalInstance.close(undefined);
        }

        function submitForm() {
            vm.working = true;
            ProfileService.updateUserPassword(vm.change).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', d.Messages);
                } else {
                    NotificationService.success('Sucesso', 'Senha atualizada com sucesso');
                    $uibModalInstance.close(true);
                }
            })
        }
    }

}());