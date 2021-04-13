import http from 'http';

export default function getBody(
  reqOrRes: http.IncomingMessage,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];

    reqOrRes.on('data', (chunk) => chunks.push(chunk));

    reqOrRes.on('end', () => {
      try {
        resolve(JSON.parse(chunks.join('')));
      } catch (err) {
        reject(err);
      }
    });
  });
}
