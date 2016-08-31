
const https = require('https');
const request = require('request');

module.exports = Pitchfork;

function Pitchfork() {
  this.api = 'https://api.pitchfork.com/api/v1';
}

Pitchfork.prototype.albumReviews = function (offset, callback) {
  this.request(`albumreviews/?offset=${offset}`, 'GET', callback);
};

Pitchfork.prototype.request = function (path, method, callback) {
  request(this.options(path, method), callback);
};

Pitchfork.prototype.options = function (path, method) {
  return options = {
    url: `${this.api}/${path}`,
    method: method,
    'agent': this.agent()
  }
};

Pitchfork.prototype.agent = function () {
  return new https.Agent({
    host: 'api.pitchfork.com',
    port: '443',
    path: '/',
    rejectUnauthorized: false
  });
};
