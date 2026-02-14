const { combineParams } = require('../util');

function CloudflareStream() {
  this.provider = 'cloudflarestream';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = CloudflareStream;

CloudflareStream.prototype.parseUrl = function(url) {
  // Match *.cloudflarestream.com/{32-char-hex-id} or .../id/iframe
  var match = url.match(
    /(?:https?:\/\/)?([^/]+\.cloudflarestream\.com)\/([a-f0-9]{32})(?:\/iframe)?/i
  );
  if (!match) {
    return undefined;
  }
  return {
    host: match[1],
    id: match[2],
  };
};

CloudflareStream.prototype.parse = function(url, params) {
  var parsed = this.parseUrl(url);
  if (!parsed) {
    return undefined;
  }
  return {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: parsed.id,
    host: parsed.host,
  };
};

CloudflareStream.prototype.createUrl = function(pathSuffix, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO || !vi.host) {
    return undefined;
  }
  var url = 'https://' + vi.host + '/' + vi.id + pathSuffix;
  url += combineParams(params);
  return url;
};

CloudflareStream.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('', vi, params);
};

CloudflareStream.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('/iframe', vi, params);
};

require('../base').bind(new CloudflareStream());
