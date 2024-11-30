const { combineParams } = require('../util');

function Tella() {
  this.provider = 'tella';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Tella;

Tella.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:video)\/([\w-]+)/i
  );
  return match ? match[1] : undefined;
};

Tella.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Tella.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Tella.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://www.tella.tv/video/', vi, params);
};

Tella.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://www.tella.tv/video/', vi, params);
};

require('../base').bind(new Tella());
