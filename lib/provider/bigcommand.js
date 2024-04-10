const { combineParams } = require('../util');

function Bigcommand() {
  this.provider = 'bigcommand';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Bigcommand;

Bigcommand.prototype.parse = function(url, params) {
  var match = url.match(
    /(?:watch)\/([\w-]+)/i
  );
  if (!match) {
    return undefined;
  }
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: match[1]
  };
  return result.id ? result : undefined;
};

Bigcommand.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Bigcommand.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://adilo.bigcommand.com/watch/', vi, params);
};

require('../base').bind(new Bigcommand());
