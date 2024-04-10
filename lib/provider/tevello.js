const { combineParams } = require('../util');

function Tevello() {
  this.provider = 'tevello';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Tevello;

Tevello.prototype.parse = function(url, params) {
  var match = url.match(
    /\/([a-zA-Z\d]+)\/([\w-]+)/i
  );
  if (!match) {
    return undefined;
  }
  
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    library: match[1],
    id: match[2]
  };
  return result.id ? result : undefined;
};

Tevello.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.library + '/' + vi.id;
  url += combineParams(params);
  return url;
};

Tevello.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://video.tevello.com/', vi, params);
};

require('../base').bind(new Tevello());
