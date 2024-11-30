const Tella = require('./tella');
const UrlParser = require('../urlParser');
const {
  testUrls,
} = require('../testUrls');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new Tella());
  return parser;
}

test('Tella: undefined', () => {
  expect(newParser().parse('https://tella.tv')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tella' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tella', mediaType: 'video' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tella', mediaType: 'video' }, format: 'embed' })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'tella', mediaType: 'video' }, format: 'image' })).toBe(undefined);
});

test('Tella: urls', () => {
  testUrls(newParser(), {
    videoInfo: {
      provider: 'tella',
      id: 'dds-youtube-thumbnail-critique-1-dpjt',
      mediaType: 'video',
    },
    formats: {
      long: 'https://www.tella.tv/video/dds-youtube-thumbnail-critique-1-dpjt',
      embed: 'https://www.tella.tv/video/dds-youtube-thumbnail-critique-1-dpjt',
    },
    urls: ['https://tella.tv/video/dds-youtube-thumbnail-critique-1-dpjt',
      'https://www.tella.tv/video/dds-youtube-thumbnail-critique-1-dpjt',
    ],
  });
});