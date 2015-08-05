angular.module('coffeeDirectives', [])
  .directive('coffeeList', [function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/coffeeDirectives/coffeeList.html',
      scope: true,
      link: function ($scope, $element, $attr) {
        $scope.list = $attr.list;
      }
    }
  }])
  .directive('coffee', [function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'app/components/coffeeDirectives/coffee.html',
      link: function ($scope, $element, $attrs) {
        //Info section shown
        $scope.expanded = false;
        //Toggle info section display
        $scope.toggleExpand = function(){
          $scope.expanded = !$scope.expanded;
        };
      }
    }
  }])
  .directive('coffeeTypeDisplay', function () {
    return {
      restrict: 'E',
      link: function ($scope, $element, $attrs) {

      }
    }
  });
