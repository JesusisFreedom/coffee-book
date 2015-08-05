angular.module('coffeeBookApi', ['ngStorage'])
  .constant('coffeeBookApiConfig', {
    url: 'http://0.0.0.0:3000'
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
  })
  .factory('authenticationInterceptor', ['$localStorage', '$location', 'coffeeBookApiConfig', function ($localStorage, $location, coffeeBookApiConfig) {
    return {
      request: function (request) {
        var urlPattern = new RegExp(coffeeBookApiConfig.url);
        if (!$localStorage.apiKey) {
          $location.path('/login')
        }
        return request;
      }
    }
  }])
  .service('coffeeApiService', ['$http', 'coffeeBookApiConfig', '$q', '$localStorage', function ($http, coffeeBookApiConfig, $q, $localStorage) {
    return {
      user: function(){
        if($localStorage.userId) return true;
        else return false;
      },
      login: function (email, password) {
        var action = "/api/Users/login?include=user"
        var config = {
          url: coffeeBookApiConfig.url + action,
          data: {
            email: email,
            password: password
          },
          method: 'post'
        };
        var defer = $q.defer();
        var req = $http(config);
        req.success(function (data, status) {
          $localStorage.apiKey = data.id;
          $localStorage.userId = data.userId;
          defer.resolve();
        });
        req.error(function (data, status) {
          defer.reject(data.error);
        });
        return defer.promise;
      },
      publicCoffee: function () {
        var action = "/coffees"
        var config = {
          url: coffeeBookApiConfig.url + action,
        };
        var defer = $q.defer();
        var req = $http(config);
        req.success(function (data, status) {
          defer.resolve(data);
        });
        req.error(function (data, status) {
          defer.reject(data.error);
        });
        return defer.promise;
      },
      myCoffee: function(){
        var action = "/coffees"
        var config = {
          url: coffeeBookApiConfig.url + action,
          params: {
            access_token: $localStorage.apiKey
          }
        };
        var defer = $q.defer();
        var req = $http(config);
        req.success(function (data, status) {
          defer.resolve(data);
        });
        req.error(function (data, status) {
          defer.reject(data.error);
        });
        return defer.promise;
      }
    };
  }]);


