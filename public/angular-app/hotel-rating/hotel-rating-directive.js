// DIRECTIVE
// angular.module('meanhotel').directive('hotelRating', hotelRating)
// // <hotel-rating>

// function hotelRating () {
//   return {
//     restrict: 'E',
//     template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//     bindToContoller: true,
//     controller: 'HotelController',
//     controllerAs: 'vm',
//     scope: {
//       stars: '@'
//     }
//   }
// }

// COMPONENT
angular.module('meanhotel').component('hotelRating', {
  bindings: {
    stars: '='
  },
  template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-asterisk">{{ star }}</span>',
  controller: 'HotelController',
  controllerAs: 'vm'
})
