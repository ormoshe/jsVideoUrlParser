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
      id: 'uVqAOAgChB8dB2VSEEES5wN45BTSME9K5l4BNHlGCPaPGCYxC',
      mediaType: 'video',
    },
    formats: {
      long: 'https://share.bunny.com/v/9206412c4aba41bcabd05b4d100911ba',
    },
    urls: ['https://share.bunny.com/v/9206412c4aba41bcabd05b4d100911ba',
    ],
  });
});