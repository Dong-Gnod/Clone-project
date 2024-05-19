import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
	getMovie,
	getPopularMovie,
	getNowPlayMovie,
	getUpcomingMovie,
	getTopRatedMovie,
	getVideo,
	getGenresList,
	getPopularTv,
	getOnTheAir,
	getAiringToday,
	getTopRatedTv,
} from '../assets/api';

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
	return useInfiniteQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useNowPlayInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: ({ pageParam = 1 }) => getNowPlayMovie({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useUpcomingInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['upcomingMovie'],
		queryFn: ({ pageParam }) => getUpcomingMovie({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useTopRatedInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: ({ pageParam }) => getTopRatedMovie({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
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
	return useInfiniteQuery({
		queryKey: ['popularTv'],
		queryFn: ({ pageParam }) => getPopularTv({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useOnTheAirInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['onTheAir'],
		queryFn: ({ pageParam }) => getOnTheAir({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useTodayInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['airingToday'],
		queryFn: ({ pageParam }) => getAiringToday({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

export const useTopRatedInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: ({ pageParam }) => getTopRatedTv({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage?.nextPage && lastPage.nextPage <= lastPage.totalPages) {
				return lastPage.nextPage;
			}
			return undefined;
		},
		select: (data) => ({
			pages: data?.pages?.flatMap((page) => page?.results) || [],
			pageParams: data?.pageParams || [],
		}),
		maxPages: 100,
	});
};

// etc
export const useVideo = ({ part, id }) => {
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

export const useSearch = (keyword) => {
	return useQuery({
		queryKey: ['searchInfo', keyword],
		queryFn: () => searchContent(keyword),
	});
};
