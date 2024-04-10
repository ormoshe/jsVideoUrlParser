const Tevello = require('./tevello');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Tevello());
  return parser;
}

test('Tevello: undefined', () => {
  expect(newParser().parse('https://tevello.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tevello' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tevello', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tevello', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tevello', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Tevello: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'tevello',
      library: '225525',
      id: '3f8967e7-2c57-435d-95f0-6bee37968c11',
      mediaType: 'video',
    },
    formats: {
      long: 'https://video.tevello.com/225525/3f8967e7-2c57-435d-95f0-6bee37968c11',
    },
    urls: ['https://video.tevello.com/225525/3f8967e7-2c57-435d-95f0-6bee37968c11',
    ],
  });
});