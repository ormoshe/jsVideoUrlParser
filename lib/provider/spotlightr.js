const { combineParams } = require('../util');

function Spotlightr() {
  this.provider = 'spotlightr';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Spotlightr;

Spotlightr.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:watch)\/([a-zA-Z\d]+)/i
  );
  return match ? match[1] : undefined;
};

Spotlightr.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

Spotlightr.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Spotlightr.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://videos.cdn.spotlightr.com/watch/', vi, params);
};

require('../base').bind(new Spotlightr());
