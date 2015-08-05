angular.module('publicCoffeeBoard', ['ngRoute', 'coffeeBookApi', 'coffeeDirectives'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/publicCoffeeBoard/publicCoffeeBoard.html',
      controller: 'PublicCoffeeBoardCtrl as ctrl',
      resolve: {
        coffeeList: ['coffeeApiService', function (coffeeApiService) {
          return coffeeApiService.publicCoffee();
        }]
      }
    });
  }])
  .controller('PublicCoffeeBoardCtrl', ['$scope', 'coffeeList', function ($scope, coffeeList) {
    var ctrl = this;
    ctrl.list = coffeeList;

  }]);
