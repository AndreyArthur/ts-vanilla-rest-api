import http from 'http';

export default function getBody(
  reqOrRes: http.IncomingMessage,
): Promise<void> {
  return new Promise((resolve) => {
    const chunks: any[] = [];

    reqOrRes.on('data', (chunk) => chunks.push(chunk));

    reqOrRes.on('end', () => {
      resolve(JSON.parse(chunks.join('')));
    });
  });
}
