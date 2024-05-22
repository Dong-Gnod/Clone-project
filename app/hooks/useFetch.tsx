import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
	return useQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});
};

export const useNowPlayMovie = () => {
	return useQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});
};

export const useUpcomingMovie = () => {
	return useQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});
};

// Movie Infinite
export const usePopularInfiniteMovie = () => {
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});
};

export const useOnTheAirTv = () => {
	return useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});
};

export const useAiringToday = () => {
	return useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
};

// Series Infinite
export const usePopularInfiniteTv = () => {
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
	return useInfiniteQuery<MoviePageData, Error, InfiniteData<MoviePageData, number>, [string], number>({
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
