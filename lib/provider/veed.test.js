const Veed = require('./veed');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Veed());
  return parser;
}

test('Veed: undefined', () => {
  expect(newParser().parse('https://veed.io')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'veed' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'veed', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'veed', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'veed', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Veed: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'veed',
      id: '4dedc8ef-bf6f-4ed0-bdd5-261fb77014a6',
      mediaType: 'video',
    },
    formats: {
      long: 'https://veed.io/view/4dedc8ef-bf6f-4ed0-bdd5-261fb77014a6',
    },
    urls: [
      'https://veed.io/view/4dedc8ef-bf6f-4ed0-bdd5-261fb77014a6',
    ],
  });
});

