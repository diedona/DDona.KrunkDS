(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AuthHelper', 'ProfileService', 'NotificationService',
        '$scope'];

    function ProfileController(AuthHelper, ProfileService, NotificationService,
        $scope) {
        var vm = this;
        vm.working = false;
        vm.profile = {};
        vm.showUpdateImg = false;

        vm.changeNotification = changeNotification;

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

        function changeNotification() {
            vm.working = true;
            ProfileService.updateReceiveNotification(vm.profile.ReceiveNotification).then(function (d) {
                if (d === undefined || d.Success == false) {
                    NotificationService.error('Erro', 'Falha ao carregar dados');
                }
            });
        }
    }

}());