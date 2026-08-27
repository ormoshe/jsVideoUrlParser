const { combineParams } = require('../util');

function Livid() {
  this.provider = 'livid';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Livid;

Livid.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:watch|embed)\/([\w-]+)/i
  );
  return match ? match[1] : undefined;
};

Livid.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Livid.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Livid.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://livid.com/watch/', vi, params);
};

Livid.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://livid.com/embed/', vi, params);
};

require('../base').bind(new Livid());
