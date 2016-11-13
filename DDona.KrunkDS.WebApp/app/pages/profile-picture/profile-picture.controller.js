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
            //making a post/put because of query string limits
            var obj = { ProfilePictureBase64: vm.Image.myCroppedImage };
            ProfileService.updateProfilePicture(obj).then(function (d) {
                if(d === undefined || d.Success == false){
                    NotificationService.error('Erro', 'Falha ao atualizar dados');
                } else {
                    NotificationService.success('Sucesso', 'Dados atualizados com sucesso');
                    var resultObj = { Success: true, ResultObject: vm.Image.myCroppedImage };
                    $uibModalInstance.close(resultObj);
                }
            })

        }

    }

}());