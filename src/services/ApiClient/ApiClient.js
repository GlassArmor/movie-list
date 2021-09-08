const appApiKey = '79006cd8dd00d856dc1a0e35309bcc1c';
export default class ApiClient {

  constructor() {

    this.getMovies = async ( query, page ) => {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${appApiKey}&query=${query}&page=${page}`;
      const res = await fetch( url );
      if ( !res.ok ) throw new Error(`Could not load data, error code: ${res.status}`);
      const body = await res.json();
      return body;
    };

    this.setRating = async ( movieID, sessionID, ratingValue ) => {
      const data = JSON.stringify({
        "value": ratingValue
      });
      const url = `https://api.themoviedb.org/3/movie/${movieID}/rating?api_key=${appApiKey}&guest_session_id=${sessionID}`;
      const res = await fetch( url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: data
      });
      if ( !res.ok ) throw new Error(`Could not send data, error code: ${res.status}`);
    };

    this.initGuestSession = async () => {
      const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${appApiKey}`;
      const res = await fetch( url );
      if ( !res.ok ) throw new Error(`Could not init guest session, error code: ${res.status}`);
      const body = await res.json();
      return body.guest_session_id;
    };

    this.getRatedMovies = async ( sessionID ) => {
      const url = `https://api.themoviedb.org/3/guest_session/${sessionID}/rated/movies?api_key=${appApiKey}`;
      const res = await fetch( url );
      if ( !res.ok ) throw new Error(`Could not load data, error code: ${res.status}`);
      const body = await res.json();
      return body;
    };

    this.getGenres = async () => {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${appApiKey}&language=en-US`;
      const res = await fetch( url );
      if ( !res.ok ) throw new Error(`Could not load data, error code: ${res.status}`);
      const body = await res.json();
      return body.genres;
    };
  };
};
