
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

    ipcRenderer.on('next', (event, offset) => {
      this.next = offset;
    });

    componentHandler.upgradeDom();

    window.onscroll = () => {
      if (window.innerHeight + window.scrollY == document.body.scrollHeight) {
        this.loadReviews();
      }
    };
  }
});
