(function () {
    'use strict';
    angular
        .module('app')
        .controller('ChangeEmailController', ChangeEmailController);

    ChangeEmailController.$inject = ['$uibModalInstance'];

    function ChangeEmailController($uibModalInstance) {
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
            alert('done');
        }
    }

}());