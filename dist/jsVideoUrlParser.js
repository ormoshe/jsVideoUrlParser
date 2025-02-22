(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.urlParser = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, _typeof(o);
	}

	var util = {};

	util.getQueryParams = function getQueryParams(qs) {
	  if (typeof qs !== 'string') {
	    return {};
	  }
	  qs = qs.split('+').join(' ');
	  var params = {};
	  var match = qs.match(/(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/);
	  var split;
	  if (match === null) {
	    return {};
	  }
	  split = match[0].substr(1).split(/[&#=]/);
	  for (var i = 0; i < split.length; i += 2) {
	    params[decodeURIComponent(split[i])] = decodeURIComponent(split[i + 1] || '');
	  }
	  return params;
	};
	util.combineParams = function combineParams(params, hasParams) {
	  if (_typeof(params) !== 'object') {
	    return '';
	  }
	  var combined = '';
	  var i = 0;
	  var keys = Object.keys(params);
	  if (keys.length === 0) {
	    return '';
	  }

	  //always have parameters in the same order
	  keys.sort();
	  if (!hasParams) {
	    combined += '?' + keys[0] + '=' + params[keys[0]];
	    i += 1;
	  }
	  for (; i < keys.length; i += 1) {
	    combined += '&' + keys[i] + '=' + params[keys[i]];
	  }
	  return combined;
	};

	//parses strings like 1h30m20s to seconds
	function getLetterTime(timeString) {
	  var totalSeconds = 0;
	  var timeValues = {
	    's': 1,
	    'm': 1 * 60,
	    'h': 1 * 60 * 60,
	    'd': 1 * 60 * 60 * 24,
	    'w': 1 * 60 * 60 * 24 * 7
	  };
	  var timePairs;

	  //expand to "1 h 30 m 20 s" and split
	  timeString = timeString.replace(/([smhdw])/g, ' $1 ').trim();
	  timePairs = timeString.split(' ');
	  for (var i = 0; i < timePairs.length; i += 2) {
	    totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs[i + 1] || 's'];
	  }
	  return totalSeconds;
	}

	//parses strings like 1:30:20 to seconds
	function getColonTime(timeString) {
	  var totalSeconds = 0;
	  var timeValues = [1, 1 * 60, 1 * 60 * 60, 1 * 60 * 60 * 24, 1 * 60 * 60 * 24 * 7];
	  var timePairs = timeString.split(':');
	  for (var i = 0; i < timePairs.length; i++) {
	    totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs.length - i - 1];
	  }
	  return totalSeconds;
	}
	util.getTime = function getTime(timeString) {
	  if (typeof timeString === 'undefined') {
	    return 0;
	  }
	  if (timeString.match(/^(\d+[smhdw]?)+$/)) {
	    return getLetterTime(timeString);
	  }
	  if (timeString.match(/^(\d+:?)+$/)) {
	    return getColonTime(timeString);
	  }
	  return 0;
	};

	var getQueryParams = util.getQueryParams;
	function UrlParser$1() {
	  for (var _i = 0, _arr = ['parseProvider', 'parse', 'bind', 'create']; _i < _arr.length; _i++) {
	    var key = _arr[_i];
	    this[key] = this[key].bind(this);
	  }
	  this.plugins = {};
	}
	var urlParser = UrlParser$1;
	UrlParser$1.prototype.parseProvider = function (url) {
	  var match = url.match(/(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i);
	  return match ? match[1] : undefined;
	};
	UrlParser$1.prototype.parse = function (url) {
	  if (typeof url === 'undefined') {
	    return undefined;
	  }
	  var provider = this.parseProvider(url);
	  var result;
	  var plugin = this.plugins[provider];
	  if (!provider || !plugin || !plugin.parse) {
	    return undefined;
	  }
	  result = plugin.parse.call(plugin, url, getQueryParams(url));
	  if (result) {
	    result = removeEmptyParameters(result);
	    result.provider = plugin.provider;
	  }
	  return result;
	};
	UrlParser$1.prototype.bind = function (plugin) {
	  this.plugins[plugin.provider] = plugin;
	  if (plugin.alternatives) {
	    for (var i = 0; i < plugin.alternatives.length; i += 1) {
	      this.plugins[plugin.alternatives[i]] = plugin;
	    }
	  }
	};
	UrlParser$1.prototype.create = function (op) {
	  if (_typeof(op) !== 'object' || _typeof(op.videoInfo) !== 'object') {
	    return undefined;
	  }
	  var vi = op.videoInfo;
	  var params = op.params;
	  var plugin = this.plugins[vi.provider];
	  params = params === 'internal' ? vi.params : params || {};
	  if (plugin) {
	    op.format = op.format || plugin.defaultFormat;
	    // eslint-disable-next-line no-prototype-builtins
	    if (plugin.formats.hasOwnProperty(op.format)) {
	      return plugin.formats[op.format].apply(plugin, [vi, Object.assign({}, params)]);
	    }
	  }
	  return undefined;
	};
	function removeEmptyParameters(result) {
	  if (result.params && Object.keys(result.params).length === 0) {
	    delete result.params;
	  }
	  return result;
	}

	var UrlParser = urlParser;
	var parser$1 = new UrlParser();
	var base = parser$1;

	function Allocine() {
	  this.provider = 'allocine';
	  this.alternatives = [];
	  this.defaultFormat = 'embed';
	  this.formats = {
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Allocine.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:\/video\/player_gen_cmedia=)([A-Za-z0-9]+)/i);
	  return match ? match[1] : undefined;
	};
	Allocine.prototype.parse = function (url) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Allocine.prototype.createEmbedUrl = function (vi) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  return 'https://player.allocine.fr/' + vi.id + '.html';
	};
	base.bind(new Allocine());

	var combineParams$q = util.combineParams;
	function CanalPlus() {
	  this.provider = 'canalplus';
	  this.defaultFormat = 'embed';
	  this.formats = {
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	CanalPlus.prototype.parseParameters = function (params) {
	  delete params.vid;
	  return params;
	};
	CanalPlus.prototype.parse = function (url, params) {
	  var _this = this;
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    id: params.vid
	  };
	  result.params = _this.parseParameters(params);
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	CanalPlus.prototype.createEmbedUrl = function (vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = 'http://player.canalplus.fr/embed/';
	  params.vid = vi.id;
	  url += combineParams$q(params);
	  return url;
	};
	base.bind(new CanalPlus());

	var combineParams$p = util.combineParams;
	function Coub() {
	  this.provider = 'coub';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Coub.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:embed|view)\/([a-zA-Z\d]+)/i);
	  return match ? match[1] : undefined;
	};
	Coub.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	Coub.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$p(params);
	  return url;
	};
	Coub.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://coub.com/view/', vi, params);
	};
	Coub.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('//coub.com/embed/', vi, params);
	};
	base.bind(new Coub());

	var combineParams$o = util.combineParams,
	  getTime$5 = util.getTime;
	function Dailymotion() {
	  this.provider = 'dailymotion';
	  this.alternatives = ['dai'];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "short": this.createShortUrl,
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl,
	    image: this.createImageUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Dailymotion.prototype.parseParameters = function (params) {
	  return this.parseTime(params);
	};
	Dailymotion.prototype.parseTime = function (params) {
	  if (params.start) {
	    params.start = getTime$5(params.start);
	  }
	  return params;
	};
	Dailymotion.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);
	  return match ? match[1] : undefined;
	};
	Dailymotion.prototype.parse = function (url, params) {
	  var _this = this;
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: _this.parseParameters(params),
	    id: _this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Dailymotion.prototype.createUrl = function (base, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  return base + vi.id + combineParams$o(params);
	};
	Dailymotion.prototype.createShortUrl = function (vi, params) {
	  return this.createUrl('https://dai.ly/', vi, params);
	};
	Dailymotion.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://dailymotion.com/video/', vi, params);
	};
	Dailymotion.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('https://www.dailymotion.com/embed/video/', vi, params);
	};
	Dailymotion.prototype.createImageUrl = function (vi, params) {
	  delete params.start;
	  return this.createUrl('https://www.dailymotion.com/thumbnail/video/', vi, params);
	};
	base.bind(new Dailymotion());

	var combineParams$n = util.combineParams;
	function Loom() {
	  this.provider = 'loom';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Loom.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:share|embed)\/([a-zA-Z\d]+)/i);
	  return match ? match[1] : undefined;
	};
	Loom.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Loom.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$n(params);
	  return url;
	};
	Loom.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://loom.com/share/', vi, params);
	};
	Loom.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('//loom.com/embed/', vi, params);
	};
	base.bind(new Loom());

	var combineParams$m = util.combineParams;
	function Tella() {
	  this.provider = 'tella';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Tella.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:video)\/([\w-]+)/i);
	  return match ? match[1] : undefined;
	};
	Tella.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Tella.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$m(params);
	  return url;
	};
	Tella.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://www.tella.tv/video/', vi, params);
	};
	Tella.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('https://www.tella.tv/video/', vi, params);
	};
	base.bind(new Tella());

	var combineParams$l = util.combineParams,
	  getTime$4 = util.getTime;
	function Twitch() {
	  this.provider = 'twitch';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video',
	    STREAM: 'stream',
	    CLIP: 'clip'
	  };
	}
	Twitch.prototype.seperateId = function (id) {
	  return {
	    pre: id[0],
	    id: id.substr(1)
	  };
	};
	Twitch.prototype.parseChannel = function (result, params) {
	  var channel = params.channel || params.utm_content || result.channel;
	  delete params.utm_content;
	  delete params.channel;
	  return channel;
	};
	Twitch.prototype.parseUrl = function (url, result, params) {
	  var match;
	  match = url.match(/(clips\.)?twitch\.tv\/(?:(?:videos\/(\d+))|(\w+(?:-[\w\d-]+)?)(?:\/clip\/(\w+))?)/i);
	  if (match && match[2]) {
	    //video
	    result.id = 'v' + match[2];
	  } else if (params.video) {
	    //video embed
	    result.id = params.video;
	    delete params.video;
	  } else if (params.clip) {
	    //clips embed
	    result.id = params.clip;
	    result.isClip = true;
	    delete params.clip;
	  } else if (match && match[1] && match[3]) {
	    //clips.twitch.tv/id
	    result.id = match[3];
	    result.isClip = true;
	  } else if (match && match[3] && match[4]) {
	    //twitch.tv/channel/clip/id
	    result.channel = match[3];
	    result.id = match[4];
	    result.isClip = true;
	  } else if (match && match[3]) {
	    result.channel = match[3];
	  }
	  return result;
	};
	Twitch.prototype.parseMediaType = function (result) {
	  var mediaType;
	  if (result.id) {
	    if (result.isClip) {
	      mediaType = this.mediaTypes.CLIP;
	      delete result.isClip;
	    } else {
	      mediaType = this.mediaTypes.VIDEO;
	    }
	  } else if (result.channel) {
	    mediaType = this.mediaTypes.STREAM;
	  }
	  return mediaType;
	};
	Twitch.prototype.parseParameters = function (params) {
	  if (params.t) {
	    params.start = getTime$4(params.t);
	    delete params.t;
	  }
	  return params;
	};
	Twitch.prototype.parse = function (url, params) {
	  var _this = this;
	  var result = {};
	  result = _this.parseUrl(url, result, params);
	  result.channel = _this.parseChannel(result, params);
	  result.mediaType = _this.parseMediaType(result);
	  result.params = _this.parseParameters(params);
	  return result.channel || result.id ? result : undefined;
	};
	Twitch.prototype.createLongUrl = function (vi, params) {
	  var url = '';
	  if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
	    url = 'https://twitch.tv/' + vi.channel;
	  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    var sep = this.seperateId(vi.id);
	    url = 'https://twitch.tv/videos/' + sep.id;
	    if (params.start) {
	      params.t = params.start + 's';
	      delete params.start;
	    }
	  } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
	    if (vi.channel) {
	      url = 'https://www.twitch.tv/' + vi.channel + '/clip/' + vi.id;
	    } else {
	      url = 'https://clips.twitch.tv/' + vi.id;
	    }
	  } else {
	    return undefined;
	  }
	  url += combineParams$l(params);
	  return url;
	};
	Twitch.prototype.createEmbedUrl = function (vi, params) {
	  var url = 'https://player.twitch.tv/';
	  if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
	    params.channel = vi.channel;
	  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    params.video = vi.id;
	    if (params.start) {
	      params.t = params.start + 's';
	      delete params.start;
	    }
	  } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
	    url = 'https://clips.twitch.tv/embed';
	    params.clip = vi.id;
	  } else {
	    return undefined;
	  }
	  url += combineParams$l(params);
	  return url;
	};
	base.bind(new Twitch());

	var combineParams$k = util.combineParams,
	  getTime$3 = util.getTime;
	function Vimeo() {
	  this.provider = 'vimeo';
	  this.alternatives = ['vimeopro'];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Vimeo.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:\/showcase\/\d+)?(?:\/(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+)\/)?videos?))?\/(\d+)/i);
	  return match ? match[1] : undefined;
	};
	Vimeo.prototype.parseHash = function (url) {
	  var match = url.match(/\/\d+\/(\w+)$/i);
	  return match ? match[1] : undefined;
	};
	Vimeo.prototype.parseParameters = function (params) {
	  if (params.t) {
	    params.start = getTime$3(params.t);
	    delete params.t;
	  }
	  if (params.h) {
	    params.hash = params.h;
	    delete params.h;
	  }
	  return params;
	};
	Vimeo.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: this.parseParameters(params),
	    id: this.parseUrl(url)
	  };
	  var hash = this.parseHash(url, params);
	  if (hash) {
	    result.params.hash = hash;
	  }
	  return result.id ? result : undefined;
	};
	Vimeo.prototype.createUrl = function (baseUrl, vi, params, type) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  var startTime = params.start;
	  delete params.start;
	  if (params.hash) {
	    if (type === 'embed') {
	      params.h = params.hash;
	    } else if (type === 'long') {
	      url += '/' + params.hash;
	    }
	    delete params.hash;
	  }
	  url += combineParams$k(params);
	  if (startTime) {
	    url += '#t=' + startTime;
	  }
	  return url;
	};
	Vimeo.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://vimeo.com/', vi, params, 'long');
	};
	Vimeo.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('//player.vimeo.com/video/', vi, params, 'embed');
	};
	base.bind(new Vimeo());

	var combineParams$j = util.combineParams,
	  getTime$2 = util.getTime;
	function Wistia() {
	  this.provider = 'wistia';
	  this.alternatives = [];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl,
	    embedjsonp: this.createEmbedJsonpUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video',
	    EMBEDVIDEO: 'embedvideo'
	  };
	}
	Wistia.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:(?:medias|iframe)\/|wvideo=)([\w-]+)/);
	  return match ? match[1] : undefined;
	};
	Wistia.prototype.parseChannel = function (url) {
	  var match = url.match(/(?:(?:https?:)?\/\/)?([^.]*)\.wistia\./);
	  var channel = match ? match[1] : undefined;
	  if (channel === 'fast' || channel === 'content') {
	    return undefined;
	  }
	  return channel;
	};
	Wistia.prototype.parseParameters = function (params, result) {
	  if (params.wtime) {
	    params.start = getTime$2(params.wtime);
	    delete params.wtime;
	  }
	  if (params.wvideo === result.id) {
	    delete params.wvideo;
	  }
	  return params;
	};
	Wistia.prototype.parseMediaType = function (result) {
	  if (result.id && result.channel) {
	    return this.mediaTypes.VIDEO;
	  } else if (result.id) {
	    delete result.channel;
	    return this.mediaTypes.EMBEDVIDEO;
	  } else {
	    return undefined;
	  }
	};
	Wistia.prototype.parse = function (url, params) {
	  var result = {
	    id: this.parseUrl(url),
	    channel: this.parseChannel(url)
	  };
	  result.params = this.parseParameters(params, result);
	  result.mediaType = this.parseMediaType(result);
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	Wistia.prototype.createUrl = function (vi, params, url) {
	  if (params.start) {
	    params.wtime = params.start;
	    delete params.start;
	  }
	  url += combineParams$j(params);
	  return url;
	};
	Wistia.prototype.createLongUrl = function (vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = 'https://' + vi.channel + '.wistia.com/medias/' + vi.id;
	  return this.createUrl(vi, params, url);
	};
	Wistia.prototype.createEmbedUrl = function (vi, params) {
	  if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
	    return undefined;
	  }
	  var url = 'https://fast.wistia.com/embed/iframe/' + vi.id;
	  return this.createUrl(vi, params, url);
	};
	Wistia.prototype.createEmbedJsonpUrl = function (vi) {
	  if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
	    return undefined;
	  }
	  return 'https://fast.wistia.com/embed/medias/' + vi.id + '.jsonp';
	};
	base.bind(new Wistia());

	var combineParams$i = util.combineParams;
	function Youku() {
	  this.provider = 'youku';
	  this.defaultFormat = 'long';
	  this.formats = {
	    embed: this.createEmbedUrl,
	    "long": this.createLongUrl,
	    flash: this.createFlashUrl,
	    "static": this.createStaticUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Youku.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/);
	  return match ? match[1] : undefined;
	};
	Youku.prototype.parseParameters = function (params) {
	  if (params.VideoIDS) {
	    delete params.VideoIDS;
	  }
	  return params;
	};
	Youku.prototype.parse = function (url, params) {
	  var _this = this;
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    id: _this.parseUrl(url),
	    params: _this.parseParameters(params)
	  };
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	Youku.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$i(params);
	  return url;
	};
	Youku.prototype.createEmbedUrl = function (vi, params) {
	  return this.createUrl('http://player.youku.com/embed/', vi, params);
	};
	Youku.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('http://v.youku.com/v_show/id_', vi, params);
	};
	Youku.prototype.createStaticUrl = function (vi, params) {
	  return this.createUrl('http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=', vi, params);
	};
	Youku.prototype.createFlashUrl = function (vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = 'http://player.youku.com/player.php/sid/' + vi.id + '/v.swf';
	  url += combineParams$i(params);
	  return url;
	};
	base.bind(new Youku());

	var combineParams$h = util.combineParams,
	  getTime$1 = util.getTime;
	function YouTube() {
	  this.provider = 'youtube';
	  this.alternatives = ['youtu', 'ytimg'];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "short": this.createShortUrl,
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl,
	    shortImage: this.createShortImageUrl,
	    longImage: this.createLongImageUrl
	  };
	  this.imageQualities = {
	    '0': '0',
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    DEFAULT: 'default',
	    HQDEFAULT: 'hqdefault',
	    SDDEFAULT: 'sddefault',
	    MQDEFAULT: 'mqdefault',
	    MAXRESDEFAULT: 'maxresdefault'
	  };
	  this.defaultImageQuality = this.imageQualities.HQDEFAULT;
	  this.mediaTypes = {
	    VIDEO: 'video',
	    PLAYLIST: 'playlist',
	    SHARE: 'share',
	    CHANNEL: 'channel'
	  };
	}
	YouTube.prototype.parseVideoUrl = function (url) {
	  var match = url.match(/(?:(?:v|vi|be|videos|shorts|embed|live)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i);
	  return match ? match[1] : undefined;
	};
	YouTube.prototype.parseChannelUrl = function (url) {
	  // Match an opaque channel ID
	  var match = url.match(/\/channel\/([\w-]+)/);
	  if (match) {
	    return {
	      id: match[1],
	      mediaType: this.mediaTypes.CHANNEL
	    };
	  }

	  // Match a vanity channel name or a user name. User urls are deprecated and
	  // currently redirect to the channel of that same name.
	  match = url.match(/\/(?:c|user)\/([\w-]+)/);
	  if (match) {
	    return {
	      name: match[1],
	      mediaType: this.mediaTypes.CHANNEL
	    };
	  }
	};
	YouTube.prototype.parseParameters = function (params, result) {
	  if (params.start || params.t) {
	    params.start = getTime$1(params.start || params.t);
	    delete params.t;
	  }
	  if (params.v === result.id) {
	    delete params.v;
	  }
	  if (params.list === result.id) {
	    delete params.list;
	  }
	  return params;
	};
	YouTube.prototype.parseMediaType = function (result) {
	  if (result.params.list) {
	    result.list = result.params.list;
	    delete result.params.list;
	  }
	  if (result.id && !result.params.ci) {
	    result.mediaType = this.mediaTypes.VIDEO;
	  } else if (result.list) {
	    delete result.id;
	    result.mediaType = this.mediaTypes.PLAYLIST;
	  } else if (result.params.ci) {
	    delete result.params.ci;
	    result.mediaType = this.mediaTypes.SHARE;
	  } else {
	    return undefined;
	  }
	  return result;
	};
	YouTube.prototype.parse = function (url, params) {
	  var channelResult = this.parseChannelUrl(url);
	  if (channelResult) {
	    return channelResult;
	  } else {
	    var result = {
	      params: params,
	      id: this.parseVideoUrl(url)
	    };
	    result.params = this.parseParameters(params, result);
	    result = this.parseMediaType(result);
	    return result;
	  }
	};
	YouTube.prototype.createShortUrl = function (vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = 'https://youtu.be/' + vi.id;
	  if (params.start) {
	    url += '#t=' + params.start;
	  }
	  return url;
	};
	YouTube.prototype.createLongUrl = function (vi, params) {
	  var url = '';
	  var startTime = params.start;
	  delete params.start;
	  if (vi.mediaType === this.mediaTypes.CHANNEL) {
	    if (vi.id) {
	      url += 'https://www.youtube.com/channel/' + vi.id;
	    } else if (vi.name) {
	      url += 'https://www.youtube.com/c/' + vi.name;
	    } else {
	      return undefined;
	    }
	  } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
	    params.feature = 'share';
	    url += 'https://www.youtube.com/playlist';
	  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    params.v = vi.id;
	    url += 'https://www.youtube.com/watch';
	  } else if (vi.mediaType === this.mediaTypes.SHARE && vi.id) {
	    params.ci = vi.id;
	    url += 'https://www.youtube.com/shared';
	  } else {
	    return undefined;
	  }
	  if (vi.list) {
	    params.list = vi.list;
	  }
	  url += combineParams$h(params);
	  if (vi.mediaType !== this.mediaTypes.PLAYLIST && startTime) {
	    url += '#t=' + startTime;
	  }
	  return url;
	};
	YouTube.prototype.createEmbedUrl = function (vi, params) {
	  var url = 'https://www.youtube.com/embed';
	  if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
	    params.listType = 'playlist';
	  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    url += '/' + vi.id;
	    //loop hack
	    if (params.loop === '1') {
	      params.playlist = vi.id;
	    }
	  } else {
	    return undefined;
	  }
	  if (vi.list) {
	    params.list = vi.list;
	  }
	  url += combineParams$h(params);
	  return url;
	};
	YouTube.prototype.createImageUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id + '/';
	  var quality = params.imageQuality || this.defaultImageQuality;
	  return url + quality + '.jpg';
	};
	YouTube.prototype.createShortImageUrl = function (vi, params) {
	  return this.createImageUrl('https://i.ytimg.com/vi/', vi, params);
	};
	YouTube.prototype.createLongImageUrl = function (vi, params) {
	  return this.createImageUrl('https://img.youtube.com/vi/', vi, params);
	};
	base.bind(new YouTube());

	var combineParams$g = util.combineParams,
	  getTime = util.getTime;
	function SoundCloud() {
	  this.provider = 'soundcloud';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    TRACK: 'track',
	    PLAYLIST: 'playlist',
	    APITRACK: 'apitrack',
	    APIPLAYLIST: 'apiplaylist'
	  };
	}
	SoundCloud.prototype.parseUrl = function (url, result) {
	  var match = url.match(/(?:m\.)?soundcloud\.com\/(?:([\w-]+)\/(sets\/)?)([\w-]+)/i);
	  if (!match) {
	    return result;
	  }
	  result.channel = match[1];
	  if (match[1] === 'playlists' || match[2]) {
	    //playlist
	    result.list = match[3];
	  } else {
	    //track
	    result.id = match[3];
	  }
	  return result;
	};
	SoundCloud.prototype.parseParameters = function (params) {
	  if (params.t) {
	    params.start = getTime(params.t);
	    delete params.t;
	  }
	  return params;
	};
	SoundCloud.prototype.parseMediaType = function (result) {
	  if (result.id) {
	    if (result.channel === 'tracks') {
	      delete result.channel;
	      delete result.params.url;
	      result.mediaType = this.mediaTypes.APITRACK;
	    } else {
	      result.mediaType = this.mediaTypes.TRACK;
	    }
	  }
	  if (result.list) {
	    if (result.channel === 'playlists') {
	      delete result.channel;
	      delete result.params.url;
	      result.mediaType = this.mediaTypes.APIPLAYLIST;
	    } else {
	      result.mediaType = this.mediaTypes.PLAYLIST;
	    }
	  }
	  return result;
	};
	SoundCloud.prototype.parse = function (url, params) {
	  var result = {};
	  result = this.parseUrl(url, result);
	  result.params = this.parseParameters(params);
	  result = this.parseMediaType(result);
	  if (!result.id && !result.list) {
	    return undefined;
	  }
	  return result;
	};
	SoundCloud.prototype.createLongUrl = function (vi, params) {
	  var url = '';
	  var startTime = params.start;
	  delete params.start;
	  if (vi.mediaType === this.mediaTypes.TRACK && vi.id && vi.channel) {
	    url = 'https://soundcloud.com/' + vi.channel + '/' + vi.id;
	  } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list && vi.channel) {
	    url = 'https://soundcloud.com/' + vi.channel + '/sets/' + vi.list;
	  } else if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
	    url = 'https://api.soundcloud.com/tracks/' + vi.id;
	  } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
	    url = 'https://api.soundcloud.com/playlists/' + vi.list;
	  } else {
	    return undefined;
	  }
	  url += combineParams$g(params);
	  if (startTime) {
	    url += '#t=' + startTime;
	  }
	  return url;
	};
	SoundCloud.prototype.createEmbedUrl = function (vi, params) {
	  var url = 'https://w.soundcloud.com/player/';
	  delete params.start;
	  if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
	    params.url = 'https%3A//api.soundcloud.com/tracks/' + vi.id;
	  } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
	    params.url = 'https%3A//api.soundcloud.com/playlists/' + vi.list;
	  } else {
	    return undefined;
	  }
	  url += combineParams$g(params);
	  return url;
	};
	base.bind(new SoundCloud());

	var combineParams$f = util.combineParams;
	function TeacherTube() {
	  this.provider = 'teachertube';
	  this.alternatives = [];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video',
	    AUDIO: 'audio',
	    DOCUMENT: 'document',
	    CHANNEL: 'channel',
	    COLLECTION: 'collection',
	    GROUP: 'group'
	  };
	}
	TeacherTube.prototype.parse = function (url, params) {
	  var result = {};
	  result.list = this.parsePlaylist(params);
	  result.params = params;
	  var match = url.match(/\/(audio|video|document|user\/channel|collection|group)\/(?:[\w-]+-)?(\w+)/);
	  if (!match) {
	    return undefined;
	  }
	  result.mediaType = this.parseMediaType(match[1]);
	  result.id = match[2];
	  return result;
	};
	TeacherTube.prototype.parsePlaylist = function (params) {
	  if (params['playlist-id']) {
	    var list = params['playlist-id'];
	    delete params['playlist-id'];
	    return list;
	  }
	  return undefined;
	};
	TeacherTube.prototype.parseMediaType = function (mediaTypeMatch) {
	  switch (mediaTypeMatch) {
	    case 'audio':
	      return this.mediaTypes.AUDIO;
	    case 'video':
	      return this.mediaTypes.VIDEO;
	    case 'document':
	      return this.mediaTypes.DOCUMENT;
	    case 'user/channel':
	      return this.mediaTypes.CHANNEL;
	    case 'collection':
	      return this.mediaTypes.COLLECTION;
	    case 'group':
	      return this.mediaTypes.GROUP;
	  }
	};
	TeacherTube.prototype.createLongUrl = function (vi, params) {
	  if (!vi.id) {
	    return undefined;
	  }
	  var url = 'https://www.teachertube.com/';
	  if (vi.list) {
	    params['playlist-id'] = vi.list;
	  }
	  if (vi.mediaType === this.mediaTypes.CHANNEL) {
	    url += 'user/channel/';
	  } else {
	    url += vi.mediaType + '/';
	  }
	  url += vi.id;
	  url += combineParams$f(params);
	  return url;
	};
	TeacherTube.prototype.createEmbedUrl = function (vi, params) {
	  if (!vi.id) {
	    return undefined;
	  }
	  var url = 'https://www.teachertube.com/embed/';
	  if (vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.AUDIO) {
	    url += vi.mediaType + '/' + vi.id;
	  } else {
	    return undefined;
	  }
	  url += combineParams$f(params);
	  return url;
	};
	base.bind(new TeacherTube());

	var combineParams$e = util.combineParams;
	function TikTok() {
	  this.provider = 'tiktok';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	TikTok.prototype.parse = function (url, params) {
	  var result = {
	    params: params,
	    mediaType: this.mediaTypes.VIDEO
	  };
	  var match = url.match(/@([^/]+)\/video\/(\d{19})/);
	  if (!match) {
	    return;
	  }
	  result.channel = match[1];
	  result.id = match[2];
	  return result;
	};
	TikTok.prototype.createLongUrl = function (vi, params) {
	  var url = '';
	  if (vi.mediaType === this.mediaTypes.VIDEO && vi.id && vi.channel) {
	    url += "https://www.tiktok.com/@".concat(vi.channel, "/video/").concat(vi.id);
	  } else {
	    return undefined;
	  }
	  url += combineParams$e(params);
	  return url;
	};
	base.bind(new TikTok());

	var combineParams$d = util.combineParams;
	function Voomly() {
	  this.provider = 'voomly';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Voomly.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:v|embed)\/([\w-]+)/i);
	  return match ? match[1] : undefined;
	};
	Voomly.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Voomly.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$d(params);
	  return url;
	};
	Voomly.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://share.voomly.com/v/', vi, params);
	};
	base.bind(new Voomly());

	var combineParams$c = util.combineParams;
	function Spotlightr() {
	  this.provider = 'spotlightr';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Spotlightr.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:watch|embed)\/([a-zA-Z\d]+)/i);
	  //var match = url.match(/(?:\/(\d+))?\/watch(?:\/.*?)?\/(\d+)/i);
	  return match ? match[1] : undefined;
	};
	Spotlightr.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Spotlightr.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$c(params);
	  return url;
	};
	Spotlightr.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://videos.spotlightr.com/watch/', vi, params);
	};
	base.bind(new Spotlightr());

	var combineParams$b = util.combineParams;
	function Bunny() {
	  this.provider = 'bunny';
	  this.alternatives = ['bunnycdn', 'mediadelivery'];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Bunny.prototype.parse = function (url, params) {
	  var match = url.match(/(?:play|embed)\/([a-zA-Z\d]+)\/([\w-]+)/i);
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
	Bunny.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.library + '/' + vi.id;
	  url += combineParams$b(params);
	  return url;
	};
	Bunny.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://iframe.mediadelivery.net/embed/', vi, params);
	};
	base.bind(new Bunny());

	var combineParams$a = util.combineParams;
	function Canva() {
	  this.provider = 'canva';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Canva.prototype.parse = function (url, params) {
	  var match = url.match(/\/design\/(.+)\/watch/);
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
	Canva.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id + '/watch';
	  url += combineParams$a(params);
	  return url;
	};
	Canva.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://www.canva.com/design/', vi, params);
	};
	base.bind(new Canva());

	var combineParams$9 = util.combineParams;
	function Descript() {
	  this.provider = 'descript';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Descript.prototype.parse = function (url, params) {
	  var match = url.match(/(?:view|embed)\/([\w-]+)/i);
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
	Descript.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$9(params);
	  return url;
	};
	Descript.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://share.descript.com/embed/', vi, params);
	};
	base.bind(new Descript());

	var combineParams$8 = util.combineParams;
	function Ted() {
	  this.provider = 'ted';
	  this.formats = {
	    "long": this.createLongUrl,
	    embed: this.createEmbedUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video',
	    PLAYLIST: 'playlist'
	  };
	}
	Ted.prototype.parseUrl = function (url, result) {
	  var match = url.match(/\/(talks|playlists\/(\d+))\/([\w-]+)/i);
	  var channel = match ? match[1] : undefined;
	  if (!channel) {
	    return result;
	  }
	  result.channel = channel.split('/')[0];
	  result.id = match[3];
	  if (result.channel === 'playlists') {
	    result.list = match[2];
	  }
	  return result;
	};
	Ted.prototype.parseMediaType = function (result) {
	  if (result.id && result.channel === 'playlists') {
	    delete result.channel;
	    result.mediaType = this.mediaTypes.PLAYLIST;
	  }
	  if (result.id && result.channel === 'talks') {
	    delete result.channel;
	    result.mediaType = this.mediaTypes.VIDEO;
	  }
	  return result;
	};
	Ted.prototype.parse = function (url, params) {
	  var result = {
	    params: params
	  };
	  result = this.parseUrl(url, result);
	  result = this.parseMediaType(result);
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	Ted.prototype.createLongUrl = function (vi, params) {
	  var url = '';
	  if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    url += 'https://ted.com/talks/' + vi.id;
	  } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.id) {
	    url += 'https://ted.com/playlists/' + vi.list + '/' + vi.id;
	  } else {
	    return undefined;
	  }
	  url += combineParams$8(params);
	  return url;
	};
	Ted.prototype.createEmbedUrl = function (vi, params) {
	  var url = 'https://embed.ted.com/';
	  if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.id) {
	    url += 'playlists/' + vi.list + '/' + vi.id;
	  } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    url += 'talks/' + vi.id;
	  } else {
	    return undefined;
	  }
	  url += combineParams$8(params);
	  return url;
	};
	base.bind(new Ted());

	var combineParams$7 = util.combineParams;
	function Facebook() {
	  this.provider = 'facebook';
	  this.alternatives = [];
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl,
	    watch: this.createWatchUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Facebook.prototype.parse = function (url, params) {
	  var result = {
	    params: params,
	    mediaType: this.mediaTypes.VIDEO
	  };
	  var match = url.match(/(?:\/(\d+))?\/videos(?:\/.*?)?\/(\d+)/i);
	  if (match) {
	    if (match[1]) {
	      result.pageId = match[1];
	    }
	    result.id = match[2];
	  }
	  if (params.v && !result.id) {
	    result.id = params.v;
	    delete params.v;
	    result.params = params;
	  }
	  if (!result.id) {
	    return undefined;
	  }
	  return result;
	};
	Facebook.prototype.createWatchUrl = function (vi, params) {
	  var url = 'https://facebook.com/watch/';
	  if (vi.mediaType !== this.mediaTypes.VIDEO || !vi.id) {
	    return undefined;
	  }
	  params = {
	    v: vi.id
	  };
	  url += combineParams$7(params);
	  return url;
	};
	Facebook.prototype.createLongUrl = function (vi, params) {
	  var url = 'https://facebook.com/';
	  if (vi.pageId) {
	    url += vi.pageId;
	  } else {
	    return undefined;
	  }
	  if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
	    url += '/videos/' + vi.id;
	  } else {
	    return undefined;
	  }
	  url += combineParams$7(params);
	  return url;
	};
	base.bind(new Facebook());

	var combineParams$6 = util.combineParams;
	function Bigcommand() {
	  this.provider = 'bigcommand';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Bigcommand.prototype.parse = function (url, params) {
	  var match = url.match(/(?:watch)\/([\w-]+)/i);
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
	Bigcommand.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$6(params);
	  return url;
	};
	Bigcommand.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://adilo.bigcommand.com/watch/', vi, params);
	};
	base.bind(new Bigcommand());

	var combineParams$5 = util.combineParams;
	function Brightcove() {
	  this.provider = 'brightcove';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Brightcove.prototype.parse = function (url, params) {
	  var match = url.match(/(\d+)\/(\w+)_(\w+)+\/index.html\?videoId=(\d+)/);
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
	Brightcove.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.library + '/' + vi.player + '_' + vi.embed + '/index.html';
	  url += combineParams$5(params);
	  return url;
	};
	Brightcove.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://players.brightcove.net/', vi, params);
	};
	base.bind(new Brightcove());

	var combineParams$4 = util.combineParams;
	function GoogleDrive() {
	  this.provider = 'google';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	GoogleDrive.prototype.parseUrl = function (url) {
	  var match = url.match(/\/d\/([\w-]+)/);
	  return match ? match[1] : undefined;
	};
	GoogleDrive.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	GoogleDrive.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id + '/preview';
	  url += combineParams$4(params);
	  return url;
	};
	GoogleDrive.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://drive.google.com/file/d/', vi, params);
	};
	base.bind(new GoogleDrive());

	var combineParams$3 = util.combineParams;
	function Groove() {
	  this.provider = 'groove';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Groove.prototype.parse = function (url, params) {
	  var match = url.match(/(?:videopage)\/([\w-]+)\/([\w-]+)/i);
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
	Groove.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.library + '/' + vi.id;
	  url += combineParams$3(params);
	  return url;
	};
	Groove.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://app.groove.cm/groovevideo/videopage/', vi, params);
	};
	base.bind(new Groove());

	var combineParams$2 = util.combineParams;
	function Streamable() {
	  this.provider = 'streamable';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Streamable.prototype.parseUrl = function (url) {
	  var match = url.match(/com\/(?:e\/|streamable\/)?([\w-]+)/);
	  //var match = url.match(/(?:\/(\d+))?\/watch(?:\/.*?)?\/(\d+)/i);
	  return match ? match[1] : undefined;
	};
	Streamable.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Streamable.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$2(params);
	  return url;
	};
	Streamable.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://streamable.com/', vi, params);
	};
	base.bind(new Streamable());

	var combineParams$1 = util.combineParams;
	function Searchie() {
	  this.provider = 'searchie';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Searchie.prototype.parseUrl = function (url) {
	  var match = url.match(/(?:watch)\/([\w-]+)/i);
	  return match ? match[1] : undefined;
	};
	Searchie.prototype.parse = function (url, params) {
	  var result = {
	    mediaType: this.mediaTypes.VIDEO,
	    params: params,
	    id: this.parseUrl(url)
	  };
	  return result.id ? result : undefined;
	};
	Searchie.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.id;
	  url += combineParams$1(params);
	  return url;
	};
	Searchie.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://app.searchie.io/watch/', vi, params);
	};
	base.bind(new Searchie());

	var combineParams = util.combineParams;
	function Tevello() {
	  this.provider = 'tevello';
	  this.defaultFormat = 'long';
	  this.formats = {
	    "long": this.createLongUrl
	  };
	  this.mediaTypes = {
	    VIDEO: 'video'
	  };
	}
	Tevello.prototype.parse = function (url, params) {
	  var match = url.match(/\/([a-zA-Z\d]+)\/([\w-]+)/i);
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
	Tevello.prototype.createUrl = function (baseUrl, vi, params) {
	  if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
	    return undefined;
	  }
	  var url = baseUrl + vi.library + '/' + vi.id;
	  url += combineParams(params);
	  return url;
	};
	Tevello.prototype.createLongUrl = function (vi, params) {
	  return this.createUrl('https://video.tevello.com/', vi, params);
	};
	base.bind(new Tevello());

	var parser = base;
	var lib = parser;
	var index = /*@__PURE__*/getDefaultExportFromCjs(lib);

	return index;

}));
