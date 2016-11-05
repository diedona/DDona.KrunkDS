(function () {
    'use strict';
    angular
        .module('app')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['SweetAlert'];

    function NotificationService(SweetAlert) {
        var service = {
            error: error
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function error(title, obj) {
            SweetAlert.swal(title, obj, "error");
        }

        function success(title, obj) {
            SweetAlert.swal(title, obj, "success");
        }

    }

}());