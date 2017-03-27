var mongoose = require('mongoose')
var Hotel = mongoose.model('Hotel')

// GET all reviews for a hotel
module.exports.reviewsGetAll = function (req, res) {
  var hotelId = req.params.hotelId
  console.log('Get hotelId', hotelId)

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, doc) {
      if (err) {
        console.log('Reviews get all query failed')
        return
      }
      res
        .status(200)
        .json(
          doc.reviews
        )
    })
}

// GET single review for a hotel
module.exports.reviewsGetOne = function (req, res) {
  var hotelId = req.params.hotelId
  var reviewId = req.params.reviewId
  console.log('GET reviewId ' + reviewId + ' for hotelId' + hotelId)

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
      if (err) {
        console.log('Reviews get one query failed')
        return
      }
      var review = hotel.reviews.id(reviewId)
      res
        .status(200)
        .json(
          review
        )
    })
}
