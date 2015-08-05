angular.module('myCoffee', ['ngRoute', 'coffeeBookApi', 'ngToast'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/my-coffee', {
      templateUrl: 'app/myCoffee/myCoffee.html',
      controller: 'CoffeeCtrl as ctrl',
      requireLogin: true
    });
  }])

  .controller('CoffeeCtrl', ['coffeeApiService', function (coffeeApiService) {
    var ctrl = this;
    ctrl.myCoffe = coffeeApiService.myCoffe();
  }]);
