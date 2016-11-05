(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider'];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
        
        localStorageServiceProvider.setPrefix('krunkDS');

        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'app/layout/layout.html',
            resolve: {
                isLoggedIn: isLoggedIn
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController as loginCtrl',
            resolve: {

            }
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController as homeCtrl'
        })
        .state('app.help', {
            url: '/help',
            templateUrl: 'app/help/help.html',
            controller: 'HelpController as helpCtrl'
        });

        function isLoggedIn($q, $timeout, $state, LoginService) {
            var deferred = $q.defer();

            // $timeout is an example; it also can be an xhr request or any other async function
            $timeout(function () {
                if (!LoginService.getAuthentication().IsAuth) {
                    // user is not logged, do not proceed
                    // instead, go to a different page
                    $state.go('login');
                    deferred.reject();
                } else {
                    // everything is fine, proceed
                    deferred.resolve();
                }
            });

            return deferred.promise;
        }
    }

}());