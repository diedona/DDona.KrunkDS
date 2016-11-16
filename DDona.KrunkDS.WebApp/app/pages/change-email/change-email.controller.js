(function () {
    'use strict';
    angular
        .module('app')
        .controller('ChangeEmailController', ChangeEmailController);

    ChangeEmailController.$inject = ['$uibModalInstance', 'ProfileService', 'NotificationService'];

    function ChangeEmailController($uibModalInstance, ProfileService, NotificationService) {
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
            ProfileService.updateUserEmail(vm.change).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', d.Messages);
                } else {
                    NotificationService.success('Sucesso', 'Email atualizado com sucesso');
                    $uibModalInstance.close(true);
                }
            })
        }
    }

}());