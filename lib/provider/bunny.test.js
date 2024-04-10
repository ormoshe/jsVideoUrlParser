const Bunny = require('./bunny');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Bunny());
  return parser;
}

test('Bunny: undefined', () => {
  expect(newParser().parse('https://bunny.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bunny' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bunny', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bunny', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bunny', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Bunny: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'bunny',
      id: 'eb1c4f77-0cda-46be-b47d-1118ad7c2ffe',
      library: '759',
      mediaType: 'video',
    },
    formats: {
      long: 'https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe',
    },
    urls: ['https://iframe.bunnycdn.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe',
    ],
  });
});