(function () {
    'use strict';
    angular
        .module('app')
        .directive('uploadPicture', uploadPicture);

    uploadPicture.$inject = [];

    function uploadPicture() {
        return {
            restrict: 'A',
            link: link
        };

        //////////////////////////////////////////////////////////////////////////

        link.$inject = ['scope', 'element', 'attr'];

        function link(scope, element, attr, ctrl) {
            element.bind("change", function (changeEvent) {
                var file = changeEvent.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    scope.$apply(function () {
                        console.log(evt.target.result);
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

}());