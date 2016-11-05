﻿(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
        '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider,
        $httpProvider) {
        
        localStorageServiceProvider.setPrefix('krunkDS');
        $httpProvider.interceptors.push('InterceptorHelper');

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
            templateUrl: 'app/pages/login/login.html',
            controller: 'LoginController as loginCtrl',
        })
        .state('app.logout', {
            url: '/logout',
            controller: 'LogOutController as logOutCtrl'
        })
        .state('app.home', {
            url: '/home',
            templateUrl: 'app/pages/home/home.html',
            controller: 'HomeController as homeCtrl'
        })
        .state('app.help', {
            url: '/help',
            templateUrl: 'app/pages/help/help.html',
            controller: 'HelpController as helpCtrl'
        });

        function isLoggedIn($q, $timeout, $state, AuthHelper) {
            var deferred = $q.defer();

            // $timeout is an example; it also can be an xhr request or any other async function
            $timeout(function () {
                var authentication = AuthHelper.getAuthentication();
                if (authentication === null || (!authentication.IsAuth)) {
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