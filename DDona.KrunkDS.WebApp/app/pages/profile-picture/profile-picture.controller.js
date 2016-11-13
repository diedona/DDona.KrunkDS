(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfilePictureController', ProfilePictureController);

    ProfilePictureController.$inject = ['AuthHelper', 'ProfileService', 'NotificationService',
        '$scope', '$uibModal'];

    function ProfilePictureController(AuthHelper, ProfileService, NotificationService,
        $scope, $uibModal) {
        var vm = this;
        vm.working = false;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            //http://codepen.io/Crackeraki/pen/QjmNVM
            angular.element(document.querySelector('#FilePicker')).on('change', handleFileSelect);
        }

        function handleFileSelect(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function () {
                    vm.profileImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }

        //////////////////////////////////////////////////////////////////////////

    }

}());