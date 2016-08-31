const Client = require('./client').Client;

module.exports = {

  'client': new Client(),

  'albumReviews': require('./album_reviews')

}
