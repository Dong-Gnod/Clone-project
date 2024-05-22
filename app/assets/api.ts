const options: RequestInit = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: process.env.NEXT_PUBLIC_MOVIE_API_KEY as string,
	},
};

export async function getGenresList() {
	const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR', options);
	const genres = await response.json();
	return { genres };
}

export async function getVideo({ part, id }: { part: string | string[]; id: string | string[] }) {
	const response = await fetch(`https://api.themoviedb.org/3/${part}/${id}/videos?language=ko-KR`, options);
	const movieVideo = await response.json();
	return { movieVideo };
}

export async function getDetail(part: string | string[], id: string | string[]) {
	const response = await fetch(`https://api.themoviedb.org/3/${part}/${id}?language=ko-KR`, options);
	const contentDetail = await response.json();
	return { contentDetail };
}

export async function getCredits(part: string | string[], id: string | string[]) {
	const response = await fetch(`https://api.themoviedb.org/3/${part}/${id}/credits?language=ko-KR`, options);
	const creditsList = await response.json();
	return { creditsList };
}

// Movies
export async function getMovie() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=ko-KR&page=1&sort_by=popularity.desc',
		options
	);
	const movieList = await response.json();
	return { movieList };
}

export const getPopularMovie = async () => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
};
export async function getPopularMovieInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getNowPlayMovie() {
	const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getNowPlayMovieInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getUpcomingMovie() {
	const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getUpcomingMovieInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getTopRatedMovie() {
	const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getTopRatedMovieInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

// Series
export async function getTvList() {
	const response = await fetch(
		'https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=true&language=ko-KR&page=1&sort_by=popularity.desc',
		options
	);
	const data = await response.json();
	return {
		results: data.results,
	};
}

export async function getPopularTv() {
	const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getPopularTvInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=${pageParam}`, options);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getOnTheAir() {
	const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getOnTheAirInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/on_the_air?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getAiringToday() {
	const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getAiringTodayInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/airing_today?language=ko-KR&page=${pageParam}`,
		options
	);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

export async function getTopRatedTv() {
	const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1`, options);
	const data = await response.json();
	return {
		results: data.results,
	};
}
export async function getTopRatedTvInfinite({ pageParam = 1 }: { pageParam: number }) {
	const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=${pageParam}`, options);
	const data = await response.json();
	return {
		results: data.results,
		nextPage: pageParam + 1,
		totalPages: data.total_pages,
	};
}

// Search
export async function searchContent(keyword: string | null) {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/multi?query=${keyword}&include_adult=false&language=ko-KR&page=1`,
		options
	);
	const searchInfo = await response.json();
	return { searchInfo };
}
