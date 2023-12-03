export async function fetchMovie() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?certification=asia&include_adult=false&include_video=true&language=ko-KO&page=10&sort_by=popularity.desc",
    options
  );

  if (!response.ok) {
    const error = new Error("Data를 가져오는 중에 오류가 났어요.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const result = await response.json();
  const movies = result.results;
  console.log(movies);

  const randomIndex = Math.floor(Math.random() * response.results.length - 1);
  const randomMovie = await movies[randomIndex];

  return { movies, headerImage: randomMovie };
}
