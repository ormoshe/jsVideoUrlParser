const { combineParams } = require('../util');

function Veed() {
  this.provider = 'veed';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Veed;

Veed.prototype.parseUrl = function(url) {
  var match = url.match(
    /view\/([\w-]+)/i
  );
  return match ? match[1] : undefined;
};

Veed.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Veed.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Veed.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://veed.io/view/', vi, params);
};

require('../base').bind(new Veed());

