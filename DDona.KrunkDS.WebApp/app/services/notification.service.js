(function () {
    'use strict';
    angular
        .module('app')
        .factory('NotificationService', NotificationService);

    NotificationService.$inject = ['SweetAlert'];

    function NotificationService(SweetAlert) {
        var service = {
            error: error,
            success: success,
            confirm: confirm,
            confirmDelete: confirmDelete
        };

        return service;

        //////////////////////////////////////////////////////////////////////////

        function error(title, obj) {
            SweetAlert.swal(title, obj, "error");
        }

        function success(title, obj) {
            SweetAlert.swal(title, obj, "success");
        }

        function confirm(title, text, type, cbConfirm, cbCancel) {
            SweetAlert.swal({
                title: title,
                text: text,
                type: type,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    if (cbConfirm) {
                        cbConfirm();
                    }
                } else {
                    if (cbCancel) {
                        cbCancel();
                    }
                }
            });
        }

        function confirmDelete(cbConfirm) {
            confirm('Tem certeza?', 'Esse registro será excluído definitivamente!', 'warning', cbConfirm, undefined);
        }

    }

}());