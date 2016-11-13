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

        vm.closeModal = closeModal;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            ////http://codepen.io/Crackeraki/pen/QjmNVM
            //var FilePicker = document.querySelector('#FilePicker');
            //console.log(FilePicker);
            //angular.element(FilePicker).on('change', handleFileSelect);
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

    }

}());