import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from '@tanstack/react-query';
import {
	getMovie,
	getPopularMovie,
	getPopularMovieInfinite,
	getNowPlayMovie,
	getNowPlayMovieInfinite,
	getUpcomingMovie,
	getUpcomingMovieInfinite,
	getTopRatedMovieInfinite,
	getVideo,
	getGenresList,
	getPopularTv,
	getPopularTvInfinite,
	getOnTheAir,
	getOnTheAirInfinite,
	getAiringToday,
	getAiringTodayInfinite,
	getTopRatedTvInfinite,
	searchContent,
} from '../assets/api';
import { MoviePageData } from '../model/Movies';

// Movie
export const useAllMovie = () => {
	return useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});
};

export const usePopularMovie = () => {
	return useSuspenseQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});
};

export const useNowPlayMovie = () => {
	return useSuspenseQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});
};

export const useUpcomingMovie = () => {
	return useSuspenseQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});
};

// Movie Infinite
export const usePopularInfiniteMovie = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['popularInfiniteMovie'],
		queryFn: ({ pageParam = 1 }) => getPopularMovieInfinite({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return lastPage.nextPage;
		},
	});
};

export const useNowPlayInfiniteMovie = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['nowPlayInfiniteMovie'],
		queryFn: getNowPlayMovieInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

export const useUpcomingInfiniteMovie = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['upcomingInfiniteMovie'],
		queryFn: getUpcomingMovieInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

export const useTopRatedInfiniteMovie = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['topRatedInfinite'],
		queryFn: getTopRatedMovieInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

// Series
export const usePopularTv = () => {
	return useSuspenseQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});
};

export const useOnTheAirTv = () => {
	return useSuspenseQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});
};

export const useAiringToday = () => {
	return useSuspenseQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
};

// Series Infinite
export const usePopularInfiniteTv = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['popularInfiniteTv'],
		queryFn: getPopularTvInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

export const useOnTheAirInfiniteTv = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['onTheAirInfinite'],
		queryFn: getOnTheAirInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

export const useTodayInfiniteTv = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['airingTodayInfinite'],
		queryFn: getAiringTodayInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

export const useTopRatedInfiniteTv = () => {
	return useSuspenseInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
		queryKey: ['topRatedInfiniteTv'],
		queryFn: getTopRatedTvInfinite,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		maxPages: 100,
	});
};

// etc
export const useVideo = ({ part, id }: { part: string; id: string }) => {
	return useQuery({
		queryKey: ['movieVideo', part, id],
		queryFn: () => getVideo({ part, id }),
	});
};

export const useGenres = () => {
	return useQuery({
		queryKey: ['genres'],
		queryFn: getGenresList,
	});
};

export const useSearch = (keyword: string) => {
	return useQuery({
		queryKey: ['searchInfo', keyword],
		queryFn: () => searchContent(keyword),
	});
};
