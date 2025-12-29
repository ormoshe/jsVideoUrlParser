const { combineParams } = require('../util');

function ScreenPal() {
  this.provider = 'screenpal';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = ScreenPal;

ScreenPal.prototype.parseUrl = function(url) {
  var match = url.match(
    /watch\/([\w-]+)/i
  );
  return match ? match[1] : undefined;
};

ScreenPal.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

ScreenPal.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

ScreenPal.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://go.screenpal.com/watch/', vi, params);
};

ScreenPal.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://go.screenpal.com/watch/embed/', vi, params);
};

require('../base').bind(new ScreenPal());

