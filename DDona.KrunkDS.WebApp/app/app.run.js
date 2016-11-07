(function () {
    'use strict';
    angular
        .module('app')
        .run(run);

    run.$inject = ['LoginService', 'DTDefaultOptions'];

    function run(LoginService, DTDefaultOptions) {
        LoginService.fillAuthData();

        DTDefaultOptions.setLanguage({
            sProcessing: '<img src="img/loading/squares.svg">'
        });
    }

}());