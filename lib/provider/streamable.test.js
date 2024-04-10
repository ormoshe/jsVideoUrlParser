const Streamable = require('./streamable');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Streamable());
  return parser;
}

test('Streamable: undefined', () => {
  expect(newParser().parse('https://streamable.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'streamable' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'streamable', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'streamable', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'streamable', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Streamable: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'streamable',
      id: 'pdh8sf',
      mediaType: 'video',
    },
    formats: {
      long: 'https://streamable.com/pdh8sf',
    },
    urls: ['https://streamable.com/pdh8sf',
    ],
  });
});