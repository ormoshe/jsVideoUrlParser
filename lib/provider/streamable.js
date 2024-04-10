const { combineParams } = require('../util');

function Streamable() {
  this.provider = 'streamable';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Streamable;

Streamable.prototype.parseUrl = function(url) {
  var match = url.match(
    /com\/(?:streamable\/)?([\w-]+)/
  );
  //var match = url.match(/(?:\/(\d+))?\/watch(?:\/.*?)?\/(\d+)/i);
  return match ? match[1] : undefined;
};

Streamable.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

Streamable.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Streamable.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://streamable.com/', vi, params);
};

require('../base').bind(new Streamable());
