const { combineParams } = require('../util');

function Voomly() {
  this.provider = 'voomly';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Voomly;

Voomly.prototype.parseUrl = function(url) {
  var match = url.match(
    /(?:v|embed)\/([a-zA-Z\d]+)/i
  );
  return match ? match[1] : undefined;
};

Voomly.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

Voomly.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Voomly.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://share.voomly.com/v/', vi, params);
};

require('../base').bind(new Voomly());
