const Pitchfork = require('./app/pitchfork');
const {ipcMain} = require('electron');
const pitchfork = new Pitchfork();
const menubar = require('menubar')({
   dir: `${__dirname}/app`,
   width: 365,
   height: 500
 });

menubar.on('ready', function ready() { });

ipcMain.on('load-reviews', (event, offset) => {
  pitchfork.albumReviews(offset, (err, resp, body) => {
    const reviews = JSON.parse(body);

    reviews.results.forEach((review) => {
      let albums = review.tombstone.albums;
      let artists = albums[0].album.artists;

      event.sender.send('review', {
        artist: artists.length ? artists[0].display_name : 'No Display Name',

        album: albums[0].album.display_name,

        genres: review.genres.map((genre) => { return genre.display_name }).join(', '),

        image: albums[0].album.artwork.homepage_large,

        rating: albums[0].rating.rating,

        url: `http://pitchfork.com${review.url}`
      });

    });

    event.sender.send('next', reviews.next);
  });
});
