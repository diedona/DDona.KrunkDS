(function () {
    'use strict';
    angular
        .module('app')
        .directive('validDate', validDate);

    // http://www.benlesh.com/2012/12/angular-js-custom-validation-via.html

    validDate.$inject = ['$locale'];

    function validDate($locale) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        //////////////////////////////////////////////////////////////////////////

        $link.inject = ['scope', 'element', 'attr', 'ctrl'];

        function link(scope, element, attr, ctrl) {

            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function (value) {               
                var valid = true;
                var dateStrFormat = $locale.DATETIME_FORMATS.customDate;

                var momentObj = moment(value, dateStrFormat.toUpperCase());
                valid = momentObj.isValid();

                ctrl.$setValidity('validDate', valid);
                return valid ? momentObj.format() : undefined;
            });

            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function (value) {
                var valid = true;
                var dateStrFormat = $locale.DATETIME_FORMATS.customDate;

                if (value !== undefined) {
                    var momentObj = moment(value);
                    valid = momentObj.isValid();

                    if (valid) {
                        value = momentObj.format(dateStrFormat.toUpperCase());
                    }
                }

                ctrl.$setValidity('validDate', valid);
                return value;
            });

        }
    }

}());