angular.module('tipLink', ['ngAnimate'])
  .directive('tipLink', [function () {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      templateUrl: 'app/components/tiplinkDirective/tipLink.html',
      link: function ($scope, $element, $attrs) {
        $scope.hover = false;
        $scope.tip = $attrs.tip;
        $scope.icon = $attrs.icon;
      }
    }
  }]);
