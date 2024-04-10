const Voomly = require('./voomly');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Voomly());
  return parser;
}

test('Voomly: undefined', () => {
  expect(newParser().parse('https://voomly.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'voomly' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'voomly', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'voomly', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'voomly', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Voomly: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'voomly',
      id: '9206412c4aba41bcabd05b4d100911ba',
      mediaType: 'video',
    },
    formats: {
      long: 'https://share.voomly.com/v/9206412c4aba41bcabd05b4d100911ba',
    },
    urls: ['https://share.voomly.com/v/9206412c4aba41bcabd05b4d100911ba',
    ],
  });
});