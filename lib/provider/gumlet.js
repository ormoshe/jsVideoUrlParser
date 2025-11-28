const { combineParams } = require('../util');

function Gumlet() {
  this.provider = 'gumlet';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Gumlet;

Gumlet.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:watch|embed)\/([\w]+)/i
  );
  return match ? match[1] : undefined;
};

Gumlet.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Gumlet.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Gumlet.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://gumlet.tv/watch/', vi, params);
};

Gumlet.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://play.gumlet.io/embed/', vi, params);
};

require('../base').bind(new Gumlet());

