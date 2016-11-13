(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfilePictureController', ProfilePictureController);

    ProfilePictureController.$inject = ['AuthHelper', 'ProfileService', 'NotificationService',
        '$scope', '$uibModalInstance'];

    function ProfilePictureController(AuthHelper, ProfileService, NotificationService,
        $scope, $uibModalInstance) {
        var vm = this;
        vm.working = false;
        vm.profileImage = '';
        vm.Image = {};

        vm.closeModal = closeModal;
        vm.acceptCrop = acceptCrop;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            vm.Image.myCroppedImage = undefined;
        }

        //////////////////////////////////////////////////////////////////////////

        function closeModal() {
            $uibModalInstance.close(undefined);
        }

        function acceptCrop() {
            console.log(vm.Image.myCroppedImage);
        }

    }

}());