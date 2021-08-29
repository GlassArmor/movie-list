const getMovieList = async ( query, page ) => {
  const apiKey = '79006cd8dd00d856dc1a0e35309bcc1c';
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
  const res = await fetch( url );
  if ( !res.ok ) throw new Error(`Could not load data, error code: ${res.status}`);
  const body = await res.json();
  return body;
};

export default getMovieList;
