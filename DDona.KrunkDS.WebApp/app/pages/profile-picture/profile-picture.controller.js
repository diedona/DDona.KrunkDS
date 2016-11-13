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

        //function handleFileSelect(evt) {
        //    var file = evt.currentTarget.files[0];
        //    var reader = new FileReader();
        //    reader.onload = function (evt) {
        //        $scope.$apply(function () {
        //            console.log(evt.target.result);
        //            vm.profileImage = evt.target.result;
        //        });
        //    };
        //    reader.readAsDataURL(file);
        //}

        //////////////////////////////////////////////////////////////////////////

        function closeModal() {
            $uibModalInstance.close(undefined);
        }

        function acceptCrop() {

        }

    }

}());