const { combineParams } = require('../util');

function Bunny() {
  this.provider = 'bunny';
  this.alternatives = ['bunnycdn', 'mediadelivery'];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Bunny;

Bunny.prototype.parse = function(url, params) {
  var match = url.match(
    /(?:play|embed)\/([a-zA-Z\d]+)\/([\w-]+)/i
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

Bunny.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.library + '/' + vi.id;
  url += combineParams(params);
  return url;
};

Bunny.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://iframe.mediadelivery.net/embed/', vi, params);
};

require('../base').bind(new Bunny());
