const CloudflareStream = require('./cloudflarestream');
const UrlParser = require('../urlParser');

function newParser() {
  const parser = new UrlParser();
  parser.bind(new CloudflareStream());
  return parser;
}

const testHost = 'customer-ikgb0eeiewfmb4ci.cloudflarestream.com';
const testId = 'ee1509ac66f4a9f57b9c9fa851e61dbc';
const videoInfo = {
  provider: 'cloudflarestream',
  id: testId,
  host: testHost,
  mediaType: 'video',
};

test('CloudflareStream: undefined', () => {
  expect(newParser().parse('https://cloudflarestream.com')).toBe(undefined);
  expect(newParser().parse('https://example.com/not-stream')).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'cloudflarestream' } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { provider: 'cloudflarestream', mediaType: 'video', id: testId } })).toBe(undefined);
  expect(newParser().create({ videoInfo: { ...videoInfo, host: undefined }, format: 'embed' })).toBe(undefined);
});

test('CloudflareStream: urls', () => {
  const parser = newParser();
  const urls = [
    'https://' + testHost + '/' + testId + '/iframe',
    'https://' + testHost + '/' + testId,
  ];
  for (const url of urls) {
    expect(parser.parse(url)).toEqual(videoInfo);
  }
  expect(parser.create({ videoInfo, format: 'long' })).toBe('https://' + testHost + '/' + testId);
  expect(parser.create({ videoInfo, format: 'embed' })).toBe('https://' + testHost + '/' + testId + '/iframe');
});
