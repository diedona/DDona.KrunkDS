(function () {
    'use strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['AuthHelper', 'ProfileService'];

    function MainController(AuthHelper, ProfileService) {
        var vm = this;
        vm.working = false;
        vm.HeaderText = "App Abstract";
        vm.FooterText = "App Abstract Footer";
        vm.authentication = {};
        vm.userPhoto = '';

        vm.getPhoto = getPhoto;

        //////////////////////////////////////////////////////////////////////////

        activate();

        //////////////////////////////////////////////////////////////////////////

        function activate() {
            vm.authentication = AuthHelper.getAuthentication();
            vm.getPhoto();
        }

        //////////////////////////////////////////////////////////////////////////

        function getPhoto() {
            if (vm.authentication === undefined || vm.authentication === null) {
                return;
            }

            ProfileService.getLoggedUserPhoto().then(function (d) {
                if (d === undefined || d.Success == false) {
                    vm.userPhoto = '';
                } else {
                    vm.userPhoto = 'data:image/jpg;base64,' + d.ResultObject;
                }
            });
        }
    }

}());