const Livid = require('./livid');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Livid());
  return parser;
}

test('Livid: undefined', () => {
  expect(newParser().parse('https://livid.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'livid' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'livid', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'livid', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'livid', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Livid: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'livid',
      id: 'jt6TR6_jch4a',
      mediaType: 'video',
    },
    formats: {
      long: 'https://livid.com/watch/jt6TR6_jch4a',
      embed: 'https://livid.com/embed/jt6TR6_jch4a',
    },
    urls: [
      'https://livid.com/watch/jt6TR6_jch4a',
      'https://livid.com/embed/jt6TR6_jch4a',
    ],
  });
});
