(function () {
    'use strict';
    angular
        .module('app')
        .directive('uploadPicture', uploadPicture);

    uploadPicture.$inject = [];

    function uploadPicture() {
        return {
            restrict: 'A',
            scope: {
                image: '=image'
            },
            link: link
        };

        //////////////////////////////////////////////////////////////////////////

        link.$inject = ['scope', 'element', 'attr'];

        function link(scope, element, attr) {
            element.bind("change", function (changeEvent) {
                var file = changeEvent.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    scope.$apply(function () {
                        scope.image.profileImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

}());