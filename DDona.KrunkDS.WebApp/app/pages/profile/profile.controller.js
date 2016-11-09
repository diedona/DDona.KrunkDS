(function () {
    'use strict';
    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AuthHelper', 'ProfileService', 'NotificationService'];

    function ProfileController(AuthHelper, ProfileService, NotificationService) {
        var vm = this;
        vm.working = false;
        vm.profile = {};

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