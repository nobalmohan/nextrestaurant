(function() {
'use strict';

    angular
      .module('nearbyrestaurants', [
        'ui.router'
      ]).config(['$stateProvider','$rootScopeProvider','$urlRouterProvider', function ($stateProvider, $rootScopeProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                    .state('main', {
                        url: '/',
                        templateUrl: 'views/main.html',
                        controller: 'mainController'
                    });
      }]).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
            $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
            $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.useXDomain = true;
      }]);


})();
