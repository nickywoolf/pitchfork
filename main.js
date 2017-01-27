const {ipcMain} = require('electron');
const menubar = require('menubar')({
   dir: `${__dirname}/app`,
   width: 365,
   height: 550
 });
const pitchfork = require('./app/pitchfork');

ipcMain.on('load-reviews', (event, offset) => {
  pitchfork.client.albumReviews(offset, (err, resp, body) => {
    let reviews = pitchfork.albumReviews.parse(body);

    event.sender.send('next', reviews.next);

    reviews.results.forEach((review) => {
      event.sender.send('review', review.toHash());
    });
  });
});
