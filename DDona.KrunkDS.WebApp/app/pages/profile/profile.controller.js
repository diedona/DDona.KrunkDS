(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AuthHelper', 'ProfileService', 'NotificationService',
        '$scope', '$uibModal'];

    function ProfileController(AuthHelper, ProfileService, NotificationService,
        $scope, $uibModal) {
        var vm = this;
        vm.working = false;
        vm.profile = {};
        vm.showUpdateImg = false;

        vm.changeNotification = changeNotification;
        vm.changeProfilePicture = changeProfilePicture;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            vm.working = true;
            ProfileService.getFullProfile().then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao carregar dados');
                } else {
                    vm.profile = d.ResultObject;
                }
            });

        }

        //////////////////////////////////////////////////////////////////////////

        function changeNotification() {
            vm.working = true;
            ProfileService.updateReceiveNotification(vm.profile.ReceiveNotification).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao carregar dados');
                }
            });
        }

        function changeProfilePicture() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/profile-picture/profile-picture.html',
                controller: 'ProfilePictureController as profilePictureCtrl',
                size: 'lg',
                backdrop: 'static'
            });

            modalInstance.result.then(function (d) {
                if (d === undefined || d.Success == false) {
                    return;
                } else {
                    var base64 = d.ResultObject.replace('data:image/png;base64,', '');
                    vm.profile.ProfilePictureBase64 = base64;
                }
            })
        }
    }

}());