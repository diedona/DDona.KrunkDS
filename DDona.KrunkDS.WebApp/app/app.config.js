(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/home');

        $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'app/layout/layout.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController as loginCtrl'
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
        })


    }

}());