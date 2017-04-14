angular.module('meanhotel').controller('HotelController', HotelController)

function HotelController ($routeParams, hotelDataFactory) {
  var vm = this
  var id = $routeParams.id
  console.log('Komið')
  hotelDataFactory.hotelDisplay(id).then(function (response) {
    vm.hotel = response.data
  })
}
