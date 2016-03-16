'use strict';

// define App

var app = angular.module('App', ['ngRoute', 'ngMaterial', 'ngAria', 'ngAnimate']);

// routeProvider

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/skills.html',
                    controller: 'skillsCtrl',
                    controllerAs: 'skills'
                })
                .when('/sources', {
                    templateUrl: 'views/sources.html',
                    controller: 'sourcesCtrl',
                    controllerAs: 'sources'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'contactCtrl',
                    controllerAs: 'contact'
                })
                .otherwise({
                    redirectTo: '/'
                })
        }
    ]);

// Controllers
app.controller('appCtrl', function($http, $scope) {
    $http.get('database/skills.json')
        .success(function(response) {
            $scope.grid = response;
        });
    $scope.title = 'Home';

});


// Skills View

    app.controller('skillsCtrl', function($http, $scope) {
        $http.get('database/skills.json')
            .success(function(response) {
                $scope.grid = response;
            });
        $scope.title = 'Skills';

    });

// Source View

    app.controller('sourcesCtrl', function($http, $scope) {
        $scope.title = 'Sources';
        $http.get('database/job.json')
            .success(function(response) {
                $scope.job = response;
            });
    });

// Contact View

    app.controller('contactCtrl', function($scope) {
        $scope.title = 'Contact'
    });

// SideNav

    app.controller('sideNavCtrl', function($scope, $timeout, $mdSidenav, $mdUtil) {
        function Toogler (navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle() }, 200);
            return debounceFn;
        }
        $scope.toggleLeft = Toogler('left');
        $scope.toggleRight = Toogler('right');

    });

// LeftSideNavCtrl

    app.controller('leftSideNavCtrl', function($scope, $mdSidenav) {
        $scope.close = function() {
            $mdSidenav('left').close()
        };
    });

// RightSideNavCtrl

    app.controller('rightSideNavCtrl', function($http, $scope, $mdSidenav) {
        $http.get('database/skills.json')
            .success(function(response) {
                $scope.skills = response;
            });
        $scope.close = function() {
            $mdSidenav('right').close()
        };
    });