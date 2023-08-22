const Groove = require('./groove');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Groove());
  return parser;
}

test('Groove: undefined', () => {
  expect(newParser().parse('https://drive.google.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'groove' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'groove', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'groove', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'groove', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Groove: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'groove',
      id: '179mieTBDjVJvRpVtFKtYKKP2qkNJkKhw',
      mediaType: 'video',
    },
    formats: {
      long: 'https://app.groove.cm/groovevideo/videopage/214510/9du8la7a248916ed838f9b7936d4ef355f612',
    },
    urls: ['https://app.groove.cm/groovevideo/videopage/214510/9du8la7a248916ed838f9b7936d4ef355f612',
    ],
  });
});