export const mockParsedLog = `177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"`;

export const mockParsedLogArray = [
  {
    ip: '177.71.128.21',
    user: null,
    timestamp: '10/Jul/2018:22:21:28 +0200',
    method: 'GET',
    url: '/intranet-analytics/',
    protocol: 'HTTP/1.1',
    status: 200,
    size: 3574,
    userAgent: 'Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7'
  },
  {
    ip: '168.41.191.40',
    user: null,
    timestamp: '09/Jul/2018:10:11:30 +0200',
    method: 'GET',
    url: 'http://example.net/faq/',
    protocol: 'HTTP/1.1',
    status: 200,
    size: 3574,
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  },
  {
    ip: '168.41.191.41',
    user: null,
    timestamp: '11/Jul/2018:17:41:30 +0200',
    method: 'GET',
    url: '/this/page/does/not/exist/',
    protocol: 'HTTP/1.1',
    status: 404,
    size: 3574,
    userAgent: 'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
  }
];