const Searchie = require('./googledrive');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new GoogleDrive());
  return parser;
}

test('Searchie: undefined', () => {
  expect(newParser().parse('https://drive.google.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Searchie: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'google',
      id: '179mieTBDjVJvRpVtFKtYKKP2qkNJkKhw',
      mediaType: 'video',
    },
    formats: {
      long: 'https://app.searchie.io/watch/M32gWdpY2o',
    },
    urls: ['https://app.searchie.io/watch/M32gWdpY2o',
    ],
  });
});