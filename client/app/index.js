angular.module('coffeeBook', ['publicCoffeeBoard', 'coffeeBookApi', 'tipLink', 'userManagement', 'ngToast', 'myCoffee'])
  .config(['ngToastProvider', function (ngToastProvider) {
    ngToastProvider.configure({
      animation: 'fade' // or 'fade'
    });
  }])

  .run(['$rootScope', '$location', 'coffeeApiService', function ($rootScope, $location, coffeeApiService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if(next.$$route.requireLogin  && !coffeeApiService.user()) $location.path('/login');
    });
  }]);


