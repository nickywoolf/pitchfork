
const https = require('https');
const request = require('request');

module.exports.Client = Client;

function Client() {
  this.api = 'https://api.pitchfork.com/api/v1';
}

Client.prototype.albumReviews = function (offset, callback) {
  this.request(`albumreviews/?offset=${offset}`, 'GET', callback);
};

Client.prototype.request = function (path, method, callback) {
  request(this.options(path, method), callback);
};

Client.prototype.options = function (path, method) {
  return options = {
    url: `${this.api}/${path}`,
    method: method,
    'agent': this.agent()
  }
};

Client.prototype.agent = function () {
  return new https.Agent({
    host: 'api.pitchfork.com',
    port: '443',
    path: '/',
    rejectUnauthorized: false
  });
};
