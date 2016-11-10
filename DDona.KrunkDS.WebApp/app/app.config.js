(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
        '$httpProvider', 'httpMethodInterceptorProvider'];

    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider,
        $httpProvider, httpMethodInterceptorProvider) {
        
        localStorageServiceProvider.setPrefix('krunkDS');
        $httpProvider.interceptors.push('InterceptorHelper');

        httpMethodInterceptorProvider.whitelistDomain('http://localhost:49972/');
        httpMethodInterceptorProvider.whitelistDomain('krunkds');

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
            resolve: {
                redirectToHome: redirectToHome
            }
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
        })
        .state('app.usuarios', {
            url: '/usuarios',
            templateUrl: 'app/pages/user/user.html',
            controller: 'UserController as userCtrl'
        })
        .state('app.copos', {
            url: '/copos',
            templateUrl: 'app/pages/cup/cup.html',
            controller: 'CupController as cupCtrl'
        })
        .state('app.profile', {
            url: '/profile',
            templateUrl: 'app/pages/profile/profile.html',
            controller: 'ProfileController as profileCtrl'
        })
        .state('app.settings', {
            url: '/settings',
            templateUrl: 'app/pages/settings/settings.html',
            controller: 'SettingsController as settingsCtrl'
        })

        isLoggedIn.$inject = ['$q', '$timeout', '$state', 'AuthHelper'];
        function isLoggedIn($q, $timeout, $state, AuthHelper) {
            var deferred = $q.defer();

            //http://stackoverflow.com/questions/29811045/how-to-redirect-in-a-ui-router-resolve
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

        redirectToHome.$inject = ['$q', '$timeout', '$state', 'AuthHelper'];
        function redirectToHome($q, $timeout, $state, AuthHelper) {
            var deferred = $q.defer();

            $timeout(function () {

                var authentication = AuthHelper.getAuthentication();
                if (authentication !== null && (authentication.IsAuth)) {
                    $state.go('app.home');
                }

                deferred.resolve();
            });

            return deferred.promise;
        }
    }

}());