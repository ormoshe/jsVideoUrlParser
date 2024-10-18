const Brightcove = require('./brightcove');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Brightcove());
  return parser;
}

test('Brightcove: undefined', () => {
  expect(newParser().parse('https://brightcove.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'brightcove' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'brightcove', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'brightcove', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'brightcove', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Brightcove: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'brightcove',
      id: '6180123400001',
      library: '6163818291001',
      player: 'default',
      embed: 'default',
      mediaType: 'video',
      params: {
        videoId: '6180123400001',
      }
    },
    formats: {
      long: 'https://players.brightcove.net/6163818291001/default_default/index.html?videoId=6180123400001',
    },
    urls: ['https://players.brightcove.net/6163818291001/default_default/index.html?videoId=6180123400001',
    ],
  });
});