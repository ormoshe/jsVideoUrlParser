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
      id: 'uVqAOAgChB8dB2VSEEES5wN45BTSME9K5l4BNHlGCPaPGCYxC',
      mediaType: 'video',
    },
    formats: {
      long: 'https://share.tevello.com/v/9206412c4aba41bcabd05b4d100911ba',
    },
    urls: ['https://share.tevello.com/v/9206412c4aba41bcabd05b4d100911ba',
    ],
  });
});