export async function fetchMovie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?certification=asia&include_adult=false&include_video=true&language=ko-KO&page=1&sort_by=popularity.desc",
    options
  );

  // if (!response.ok) {
  //   const error = new Error("Data를 가져오는 중에 오류가 났어요.");
  //   error.code = response.status;
  //   error.info = await response.json();
  //   throw error;
  // }

  const movieList = await response.json();

  return { movieList };
}

export async function fetchGenres() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=ko",
    options
  );

  if (!response.ok) {
    const error = new Error("Data를 가져오는 중에 오류가 났어요.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const genres = await response.json();

  return { genres };
}

export async function fetchSeries() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=ko-KO&page=1&sort_by=popularity.desc",
    options
  );

  if (!response.ok) {
    const error = new Error("Data를 가져오는 중에 오류가 났어요.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const seriesList = await response.json();

  return { seriesList };
}
