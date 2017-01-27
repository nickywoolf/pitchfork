module.exports.parse = (response) => {
  let reviews = JSON.parse(response);
  let matches = /\?offset=(\d.*)$/.exec(reviews.next);

  return {
    next: matches ? matches[1] : 0,
    results: reviews.results.map((review) => {
      return new Review(review);
    })
  };
};

function Review(review) {
  this.review = review;
}

Review.prototype.toHash = function () {
  return {
    artist: this.artist(),
    album: this.album(),
    genres: this.genres(),
    image: this.image(),
    rating: this.rating(),
    url: this.url()
  };
};

Review.prototype.artist = function () {
  let artists = this.review.tombstone.albums[0].album.artists;
  return artists.length ? artists[0].display_name : 'No Artist';
};

Review.prototype.album = function () {
  return this.review.tombstone.albums[0].album.display_name;
};

Review.prototype.genres = function () {
  return this.review.genres.map((genre) => {
    return genre.display_name
  }).join(', ')
};

Review.prototype.image = function () {
  return this.review.tombstone.albums[0].album.artwork.homepage_large;
};

Review.prototype.rating = function () {
  return this.review.tombstone.albums[0].rating.rating;
};

Review.prototype.url = function () {
  return `http://pitchfork.com${this.review.url}`;
};
