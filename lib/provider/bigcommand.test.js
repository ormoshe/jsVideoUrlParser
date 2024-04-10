const Bigcommand = require('./bigcommand');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Bigcommand());
  return parser;
}

test('Bigcommand: undefined', () => {
  expect(newParser().parse('https://adilo.bigcommand.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bigcommand' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bigcommand', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bigcommand', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'bigcommand', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Bigcommand: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'bigcommand',
      id: 'O4l1zad8',
      mediaType: 'video',
    },
    formats: {
      long: 'https://adilo.bigcommand.com/watch/O4l1zad8',
    },
    urls: ['https://adilo.bigcommand.com/watch/O4l1zad8',
    ],
  });
});