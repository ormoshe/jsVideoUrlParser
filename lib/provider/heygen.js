const { combineParams } = require('../util');

function HeyGen() {
  this.provider = 'heygen';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = HeyGen;

HeyGen.prototype.parseUrl = function(url) {
  var match = url.match(
    /embeds\/([\w-]+)/i
  );
  if (match) {
    return match[1];
  }
  match = url.match(
    /videos\/[\w-]*?([a-f0-9]{32}-[a-z]+)/i
  );
  return match ? match[1] : undefined;
};

HeyGen.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

HeyGen.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

HeyGen.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://app.heygen.com/videos/', vi, params);
};

HeyGen.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('https://app.heygen.com/embeds/', vi, params);
};

require('../base').bind(new HeyGen());
