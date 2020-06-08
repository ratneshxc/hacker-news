import fetch from 'isomorphic-fetch'

export function fetchPopularRepos (page = '1') {
  const encodedURI = encodeURI(`http://hn.algolia.com/api/v1/search?page=${page}`)
  return fetch(encodedURI)
    .then((data) => data.json())
    .then((repos) => {
      return repos;
    })
    .catch((error) => {
      console.warn(error)
      return error;
    });
}