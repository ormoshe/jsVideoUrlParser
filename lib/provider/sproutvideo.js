const { combineParams } = require('../util');

function SproutVideo() {
  this.provider = 'sproutvideo';
  this.alternatives = ['vids'];
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = SproutVideo;

SproutVideo.prototype.parseEmbedUrl = function(url) {
  var match = url.match(
    /(?:embed|file)\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/i
  );
  if (!match) {
    return undefined;
  }
  return {
    id: match[1],
    token: match[2],
  };
};

SproutVideo.prototype.parseShareUrl = function(url) {
  var match = url.match(
    /(?:https?:\/\/)?([^/]+\.vids\.io)\/videos\/([a-zA-Z0-9]+)(?:\/([\w-]+))?/i
  );
  if (!match) {
    return undefined;
  }
  var result = {
    host: match[1],
    id: match[2],
  };
  if (match[3]) {
    result.slug = match[3];
  }
  return result;
};

SproutVideo.prototype.parse = function(url, params) {
  var parsed = this.parseEmbedUrl(url) || this.parseShareUrl(url);
  if (!parsed) {
    return undefined;
  }
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: parsed.id,
  };
  if (parsed.token) {
    result.token = parsed.token;
  }
  if (parsed.host) {
    result.host = parsed.host;
  }
  if (parsed.slug) {
    result.slug = parsed.slug;
  }
  return result;
};

SproutVideo.prototype.createEmbedUrl = function(vi, params) {
  if (!vi.id || !vi.token || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = 'https://videos.sproutvideo.com/embed/' + vi.id + '/' + vi.token;
  url += combineParams(params);
  return url;
};

SproutVideo.prototype.createLongUrl = function(vi, params) {
  if (vi.host && vi.id && vi.mediaType === this.mediaTypes.VIDEO) {
    var url = 'https://' + vi.host + '/videos/' + vi.id;
    if (vi.slug) {
      url += '/' + vi.slug;
    }
    url += combineParams(params);
    return url;
  }
  return this.createEmbedUrl(vi, params);
};

require('../base').bind(new SproutVideo());
