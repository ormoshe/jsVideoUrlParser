const { combineParams } = require('../util');

function Groove() {
  this.provider = 'groove';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Groove;

Groove.prototype.parse = function(url, params) {
  var match = url.match(
    /(?:videopage)\/([\w-]+)\/([\w-]+)/i
  );
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    library: match[1],
    id: match[2]
  };
  return result.id ? result : undefined;
};

Groove.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.library + '/' + vi.id;
  url += combineParams(params);
  return url;
};

Groove.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://app.groove.cm/groovevideo/videopage/', vi, params);
};

require('../base').bind(new Groove());
