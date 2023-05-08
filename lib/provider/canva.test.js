const Canva = require('./canva');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Canva());
  return parser;
}

test('Canva: undefined', () => {
  expect(newParser().parse('https://canva.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Canva: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'canva',
      id: 'uVqAOAgChB8dB2VSEEES5wN45BTSME9K5l4BNHlGCPaPGCYxC',
      mediaType: 'video',
    },
    formats: {
      long: 'https://share.canva.com/v/9206412c4aba41bcabd05b4d100911ba',
    },
    urls: ['https://share.canva.com/v/9206412c4aba41bcabd05b4d100911ba',
    ],
  });
});