const { combineParams } = require('../util');

function Searchie() {
  this.provider = 'searchie';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Searchie;

Searchie.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:watch)\/([\w-]+)/i
  );
  return match ? match[1] : undefined;
};

Searchie.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

Searchie.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Searchie.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://app.searchie.io/watch/', vi, params);
};

require('../base').bind(new GoogleDrive());
