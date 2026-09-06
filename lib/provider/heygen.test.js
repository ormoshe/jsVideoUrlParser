const HeyGen = require('./heygen');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new HeyGen());
  return parser;
}

test('HeyGen: undefined', () => {
  expect(newParser().parse('https://heygen.com')).toBe(undefined);
  expect(newParser().parse('https://app.heygen.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'heygen' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'heygen', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'heygen', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'heygen', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('HeyGen: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'heygen',
      id: '3dacf7f11a564b8d868ed89f0a489767-en',
      mediaType: 'video',
    },
    formats: {
      long: 'https://app.heygen.com/videos/3dacf7f11a564b8d868ed89f0a489767-en',
      embed: 'https://app.heygen.com/embeds/3dacf7f11a564b8d868ed89f0a489767-en',
    },
    urls: [
      'https://app.heygen.com/videos/masterclass-colors-of-water-english-3dacf7f11a564b8d868ed89f0a489767-en',
      'https://app.heygen.com/embeds/3dacf7f11a564b8d868ed89f0a489767-en',
    ],
  });

  expect(newParser().parse(
    'https://app.heygen.com/videos/masterclass-colors-of-water-english-3dacf7f11a564b8d868ed89f0a489767-en?proj=72beff6df311457aaf317f6037493f25'
  )).toEqual({
    provider: 'heygen',
    id: '3dacf7f11a564b8d868ed89f0a489767-en',
    mediaType: 'video',
    params: {
      proj: '72beff6df311457aaf317f6037493f25',
    },
  });
});
