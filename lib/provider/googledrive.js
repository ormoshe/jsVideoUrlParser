const { combineParams } = require('../util');

function GoogleDrive() {
  this.provider = 'google';
  this.defaultFormat = 'long';
  this.formats = {
    long: this.createLongUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = GoogleDrive;

GoogleDrive.prototype.parseUrl = function(url) {
  var match = url.match(/\/d\/([\w-]+)/);
  return match ? match[1] : undefined;
};

GoogleDrive.prototype.parse = function(url, params) {
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: params,
    id: this.parseUrl(url)
  };
  return result.id ? result : undefined;
};

GoogleDrive.prototype.createUrl = function(baseUrl, vi, params) {
  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
    return undefined;
  }

  var url = baseUrl + vi.id;
  url += combineParams(params);
  return url;
};

GoogleDrive.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://drive.google.com/file/d/', vi, params);
};

require('../base').bind(new GoogleDrive());
