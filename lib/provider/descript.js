const { combineParams } = require('../util');

function Descript() {
  this.provider = 'descript';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Descript;

Descript.prototype.parse = function(url, params) {
  var match = url.match(
    /(?:view|embed)\/([\w-]+)/i
  );
  if (!match) {
    return undefined;
  }
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: match[1]
  };
  return result.id ? result : undefined;
};

Descript.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

Descript.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://share.descript.com/embed/', vi, params);
};

require('../base').bind(new Descript());
