const Canva = require('./canva');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Canva());
  return parser;
}

test('Canva: undefined', () => {
  expect(newParser().parse('https://canva.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'canva', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Canva: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'canva',
      id: 'DAF0PyLfZbE/7UnN9Ll-VL4RzkN2PrA-zQ',
      mediaType: 'video',
    },
    formats: {
      long: 'https://www.canva.com/design/DAF0PyLfZbE/7UnN9Ll-VL4RzkN2PrA-zQ/watch',
    },
    urls: ['https://www.canva.com/design/DAF0PyLfZbE/7UnN9Ll-VL4RzkN2PrA-zQ/watch',
    ],
  });
});