const Gumlet = require('./gumlet');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Gumlet());
  return parser;
}

test('Gumlet: undefined', () => {
  expect(newParser().parse('https://gumlet.tv')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'gumlet' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'gumlet', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'gumlet', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'gumlet', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Gumlet: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'gumlet',
      id: '6928be231f915ae256830d19',
      mediaType: 'video',
    },
    formats: {
      long: 'https://gumlet.tv/watch/6928be231f915ae256830d19',
      embed: 'https://play.gumlet.io/embed/6928be231f915ae256830d19',
    },
    urls: [
      'https://gumlet.tv/watch/6928be231f915ae256830d19/',
      'https://play.gumlet.io/embed/6928be231f915ae256830d19',
    ],
  });
});

