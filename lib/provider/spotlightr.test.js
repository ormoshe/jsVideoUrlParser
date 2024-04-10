const Spotlightr = require('./spotlightr');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Spotlightr());
  return parser;
}

test('Spotlightr: undefined', () => {
  expect(newParser().parse('https://spotlightr.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'spotlightr' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'spotlightr', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'spotlightr', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'spotlightr', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Spotlightr: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'spotlightr',
      id: 'MTM4MzcxNA',
      mediaType: 'video',
    },
    formats: {
      long: 'https://videos.spotlightr.com/watch/MTM4MzcxNA',
    },
    urls: ['https://videos.spotlightr.com/watch/MTM4MzcxNA==',
    ],
  });
});