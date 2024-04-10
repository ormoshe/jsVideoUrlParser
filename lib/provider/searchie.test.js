const Searchie = require('./searchie');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Searchie());
  return parser;
}

test('Searchie: undefined', () => {
  expect(newParser().parse('https://app.searchie.io')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'searchie', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Searchie: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'searchie',
      id: 'M32gWdpY2o',
      mediaType: 'video',
    },
    formats: {
      long: 'https://app.searchie.io/watch/M32gWdpY2o',
    },
    urls: ['https://app.searchie.io/watch/M32gWdpY2o',
    ],
  });
});