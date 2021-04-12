export default function parseQueryString(query: string): any {
  const parsedQuery = decodeURIComponent(query);

  return parsedQuery.split('&').reduce((acc, curr) => (
    // eslint-disable-next-line no-param-reassign
    acc = { ...acc, [curr.split('=')[0]]: curr.split('=')[1] }
  ), {});
}
