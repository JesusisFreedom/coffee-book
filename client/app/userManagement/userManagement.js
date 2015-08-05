angular.module('userManagement', ['ngRoute', 'coffeeBookApi', 'ngToast'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'app/userManagement/login.html',
      controller: 'LoginCtrl as ctrl',
      requireLogin: false
    });

    $routeProvider.when('/signup', {
      templateUrl: 'app/userManagement/signup.html',
      controller: 'SignUpCtrl as ctrl',
      requireLogin: false
    });

  }])

  .controller('LoginCtrl', ['coffeeApiService', '$location', 'ngToast', function (coffeeApiService, $location, ngToast) {
    var ctrl = this;
    ctrl.submit = function () {
      if (ctrl.loginForm.$valid) {
        var loginReq = coffeeApiService.login(ctrl.email, ctrl.password);
        loginReq.then(function () {
            //Go to dash
            $location.path("/my-coffee");
          },
          function (error) {
            ngToast.create({
              className: 'warning',
              content: 'Login failed, wrong password or email.'
            });
          })
      }
    };
  }])

  .controller('SignUpCtrl'[function () {
    var ctrl = this;
  }])

  .directive('accountMenu', ['coffeeApiService', function (coffeeApiService) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'app/userManagement/accountMenu.html',
      link: function ($scope, $element, $attrs) {
        $scope.loggedIn = coffeeApiService.user();
      }
    };
  }]);
