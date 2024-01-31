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

export async function getVideo(id) {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=ko`, options);
	const movieVideo = await response.json();
	return { movieVideo };
}

// Movies

export async function getMovie() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/movie?certification=asia&include_adult=false&include_video=true&language=ko&page=10&sort_by=popularity.desc',
		options
	);
	const movieList = await response.json();
	return { movieList };
}

export async function getPopularMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options);
	const popularMovie = await response.json();
	return { popularMovie };
}

export async function getTopRatedMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', options);
	const topRated = await response.json();
	return { topRated };
}

export async function getNowPlayMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko&page=2', options);
	const nowPlayMovie = await response.json();
	return { nowPlayMovie };
}

export async function getUpcomingMovie() {
	const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=ko&page=1', options);
	const upcomingMovie = await response.json();
	return { upcomingMovie };
}

// Series
export async function getTv() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=ko&page=10&sort_by=popularity.desc',
		options
	);
	const tvList = await response.json();
	return { tvList };
}

export async function getTopRatedTv() {
	const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=ko&page=1', options);
	const topRatedTv = await response.json();
	return { topRatedTv };
}

export async function getPopularTv() {
	const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=ko&page=1', options);
	const popularTv = await response.json();
	return { popularTv };
}

export async function getOnTheAir() {
	const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=ko&page=1', options);
	const onTheAir = await response.json();
	return { onTheAir };
}

export async function getAiringToday() {
	const response = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=ko&page=1', options);
	const airingToday = await response.json();
	return { airingToday };
}

// Search
export async function searchContent() {
	const response = await fetch(
		'https://api.themoviedb.org/3/search/multi?include_adult=false&language=ko&page=1',
		options
	);
	const searchInfo = await response.json();
	return { searchInfo };
}
