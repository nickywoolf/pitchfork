
const {ipcRenderer} = require('electron');

new Vue({
  el: '#app',

  data: {
    next: 0,
    reviews: []
  },

  methods: {
    loadReviews: function () {
      ipcRenderer.send('load-reviews', this.next);
    }
  },

  ready: function () {
    this.loadReviews();

    ipcRenderer.on('review', (event, review) => {
      this.reviews.push(review);
    });

    ipcRenderer.on('next', (event, url) => {
      let matches = /\?offset=(\d.*)$/.exec(url);
      this.next = matches ? matches[1] : 0;
    });

    componentHandler.upgradeDom();
  }
});
