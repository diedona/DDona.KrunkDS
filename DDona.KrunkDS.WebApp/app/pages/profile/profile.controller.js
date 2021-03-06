﻿(function () {
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
        vm.changeEmail = changeEmail;
        vm.changePassword = changePassword;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            getFullProfile();
        }

        function getFullProfile() {
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
                    $scope.mainCtrl.getPhoto();
                }
            })
        }

        function changeEmail() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/change-email/change-email.html',
                controller: 'ChangeEmailController as changeEmailCtrl',
                size: 'md',
                backdrop: 'static'
            });

            modalInstance.result.then(function (d) {
                if (d === true) {
                    getFullProfile();
                }
            });
        }

        function changePassword() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/pages/change-password/change-password.html',
                controller: 'ChangePasswordController as changePasswordCtrl',
                size: 'md',
                backdrop: 'static'
            });
        }
    }

}());