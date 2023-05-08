const { combineParams } = require('../util');

function Canva() {
  this.provider = 'canva';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Canva;

Canva.prototype.parse = function(url, params) {
  var match = url.match(/\/design\/([\w-]+)/);
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: match[1]
  };
  return result.id ? result : undefined;
};

Canva.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id + '/watch?embed';
  url += combineParams(params);
  return url;
};

Canva.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://www.canva.com/design/', vi, params);
};

require('../base').bind(new Canva());
