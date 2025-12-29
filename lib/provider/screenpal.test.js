const ScreenPal = require('./screenpal');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new ScreenPal());
  return parser;
}

test('ScreenPal: undefined', () => {
  expect(newParser().parse('https://go.screenpal.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'screenpal' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'screenpal', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'screenpal', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'screenpal', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('ScreenPal: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'screenpal',
      id: 'cTXqrUnql6g',
      mediaType: 'video',
    },
    formats: {
      long: 'https://go.screenpal.com/watch/cTXqrUnql6g',
      embed: 'https://go.screenpal.com/watch/embed/cTXqrUnql6g',
    },
    urls: [
      'https://go.screenpal.com/watch/cTXqrUnql6g',
    ],
  });
});

