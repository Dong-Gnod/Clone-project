const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
	},
};

export async function getGenresList() {
	const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options);
	const genres = await response.json();
	return { genres };
}

// Movies

export async function getMovie() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/movie?certification=asia&include_adult=false&include_video=true&language=ko-KO&page=10&sort_by=popularity.desc',
		options
	);
	const movieList = await response.json();
	return { movieList };
}

export async function getNowPlayMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KO&page=2', options);
	const nowPlayMovie = await response.json();
	return { nowPlayMovie };
}

export async function getUpcomingMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko-KO&page=1', options);
	const upcomingMovie = await response.json();
	return { upcomingMovie };
}

// Series
export async function getSeries() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=ko-KO&page=10&sort_by=popularity.desc',
		options
	);
	const seriesList = await response.json();
	return { seriesList };
}

export async function getOnTheAir() {
	const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=ko-KO&page=1', options);
	const onTheAir = await response.json();
	return { onTheAir };
}

export async function getAiringToday() {
	const response = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options);
	const airingToday = await response.json();
	return { airingToday };
}
