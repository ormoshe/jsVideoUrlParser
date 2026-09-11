const SproutVideo = require('./sproutvideo');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new SproutVideo());
  return parser;
}

const embedInfo = {
  provider: 'sproutvideo',
  id: 'ee9addb51f1be4c064',
  token: '3186a1207bb49cc2',
  mediaType: 'video',
};

const shareInfo = {
  provider: 'sproutvideo',
  id: '7991d5b3181ce6c2f0',
  host: 'projektmelody.vids.io',
  slug: 'projekt-melody-valentines-special-2025',
  mediaType: 'video',
};

test('SproutVideo: undefined', () => {
  expect(newParser().parse('https://sproutvideo.com')).toBe(undefined);
  expect(newParser().parse('https://videos.sproutvideo.com')).toBe(undefined);
  expect(newParser().parse('https://mysite.vids.io')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'sproutvideo' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'sproutvideo', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'sproutvideo', mediaType: 'video', id: embedInfo.id } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { ...shareInfo, token: undefined }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'sproutvideo', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('SproutVideo: embed urls', () => {
  testUrls(newParser(), {
    videoInfo: embedInfo,
    formats: {
      long: 'https://videos.sproutvideo.com/embed/ee9addb51f1be4c064/3186a1207bb49cc2',
      embed: 'https://videos.sproutvideo.com/embed/ee9addb51f1be4c064/3186a1207bb49cc2',
    },
    urls: [
      'https://videos.sproutvideo.com/embed/ee9addb51f1be4c064/3186a1207bb49cc2',
      'https://api-files.sproutvideo.com/file/ee9addb51f1be4c064/3186a1207bb49cc2/1080.mp4',
    ],
  });
});

test('SproutVideo: share urls', () => {
  testUrls(newParser(), {
    videoInfo: shareInfo,
    formats: {
      long: 'https://projektmelody.vids.io/videos/7991d5b3181ce6c2f0/projekt-melody-valentines-special-2025',
    },
    urls: [
      'https://projektmelody.vids.io/videos/7991d5b3181ce6c2f0/projekt-melody-valentines-special-2025',
    ],
  });

  expect(newParser().parse(
    'https://mysite123.vids.io/videos/5a9bdcb21f11eacdd0'
  )).toEqual({
    provider: 'sproutvideo',
    id: '5a9bdcb21f11eacdd0',
    host: 'mysite123.vids.io',
    mediaType: 'video',
  });
});
