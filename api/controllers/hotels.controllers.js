var mongoose = require('mongoose')
var Hotel = mongoose.model('Hotel')

var runGeoQuery = function (req, res) {
  var lng = parseFloat(req.query.lng)
  var lat = parseFloat(req.query.lat)

  // A geoJSON point
  var point = {
    type: 'Point',
    coordinates: [lng, lat]
  }

  var geoOptions = {
    spherical: true,
    maxDistance: 2000,
    num: 5
  }

  Hotel
    .geoNear(point, geoOptions, function (err, results, stats) {
      if (err) {
        console.log('Error with geo query')
        return
      }
      console.log('Geo results', results)
      console.log('Geo stats', stats)
      res
        .status(200)
        .json(results)
    })
}

module.exports.hotelsGetAll = function (req, res) {
  var offset = 0
  var count = 5

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res)
    return
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10)
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10)
  }

  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function (err, hotels) {
      if (err) {
        console.log('Hotels get one query failed')
        return
      }
      console.log('Found hotels', hotels.length)
      res
        .json(hotels)
    })
}

module.exports.hotelsGetOne = function (req, res) {
  var hotelId = req.params.hotelId
  console.log('Get hotelID', hotelId)

  Hotel
    .findById(hotelId)
    .exec(function (err, doc) {
      if (err) {
        console.log('Hotels get one query failed')
        return
      }
      res
        .status(200)
        .json(
          doc
        )
    })
}

module.exports.hotelsAddOne = function (req, res) {
  var db = dbconn.get()
  var collection = db.collection('hotels')
  var newHotel

  console.log('POST new hotel')

  if (req.body && req.body.name && req.body.stars) {
    newHotel = req.body
    newHotel.stars = parseInt(req.body.stars, 10)
    collection.insertOne(newHotel, function (err, response) {
      if (err) {
        console.log('Hotels add one query failed')
        return
      }
      console.log(response)
      console.log(response.ops)
      res
        .status(201)
        .json(response.ops)
    })
  } else {
    console.log('Data missing from body')
    res
      .status(400)
      .json({
        message: 'Required data missing from body'
      })
  }
}
