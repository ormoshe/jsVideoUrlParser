const GoogleDrive = require('./googledrive');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new GoogleDrive());
  return parser;
}

test('GoogleDrive: undefined', () => {
  expect(newParser().parse('https://drive.google.com')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'googledrive' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'googledrive', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'googledrive', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'googledrive', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('GoogleDrive: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'google',
      id: '179mieTBDjVJvRpVtFKtYKKP2qkNJkKhw',
      mediaType: 'video',
    },
    formats: {
      long: 'https://drive.google.com/file/d/179mieTBDjVJvRpVtFKtYKKP2qkNJkKhw/preview',
    },
    urls: ['https://drive.google.com/file/d/179mieTBDjVJvRpVtFKtYKKP2qkNJkKhw/preview',
    ],
  });
});