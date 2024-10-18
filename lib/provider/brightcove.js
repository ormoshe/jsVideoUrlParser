const { combineParams } = require('../util');

function Brightcove() {
  this.provider = 'brightcove';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Brightcove;

Brightcove.prototype.parse = function(url, params) {
  var match = url.match(
    /(\d+)\/(\w+)_(\w+)+\/index.html\?videoId=(\d+)/
  );
  if (!match) {
    return undefined;
  }
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    library: match[1],
    player: match[2],
    embed: match[3],
    id: match[4]
  };
  return result.id ? result : undefined;
};

Brightcove.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.library + '/' + vi.player + '_' + vi.embed + '/index.html';
  url += combineParams(params);
  return url;
};

Brightcove.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://players.brightcove.net/', vi, params);
};

require('../base').bind(new Brightcove());
