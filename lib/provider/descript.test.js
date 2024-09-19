const Descript = require('./descript');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Descript());
  return parser;
}

test('Descript: undefined', () => {
  expect(newParser().parse('https://descript.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'descript' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'descript', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'descript', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'descript', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Descript: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'descript',
      id: 'pXZDkaSOEwg',
      mediaType: 'video',
    },
    formats: {
      long: 'https://share.descript.com/embed/pXZDkaSOEwg',
    },
    urls: ['https://share.descript.com/embed/pXZDkaSOEwg',
    ],
  });
});