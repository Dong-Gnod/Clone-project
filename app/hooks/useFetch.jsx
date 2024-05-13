import { useInfiniteQuery, useQuery, useSuspenseQuery } from '@tanstack/react-query';
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
		staleTime: Infinity,
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
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data?.pages.flatMap((page) => page.popularMovie.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useNowPlayInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: ({ pageParam = 1 }) => getNowPlayMovie({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.nowPlayMovie.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useUpcomingInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.upcomingMovie.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useTopRatedInfiniteMovie = () => {
	return useInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: getTopRatedMovie,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.topRated.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

// Series
export const usePopularTv = (part, id) => {
	return useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});
};

export const useOnTheAirTv = (part, id) => {
	return useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});
};

export const useAiringToday = (part, id) => {
	return useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
};

// Series Infinite
export const usePopularInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['popularTv'],
		queryFn: ({ pageParam = 1 }) => getPopularTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.popularTv.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useOnTheAirInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['onTheAir'],
		queryFn: ({ pageParam = 1 }) => getOnTheAir({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.onTheAir.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useTodayInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['airingToday'],
		queryFn: ({ pageParam = 1 }) => getAiringToday({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.airingToday.results),
			pageParams: data.pageParams,
		}),
		maxPages: 100,
	});
};

export const useTopRatedInfiniteTv = () => {
	return useInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: ({ pageParam = 1 }) => getTopRatedTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		select: (data) => ({
			pages: data.pages.flatMap((page) => page.topRatedTv.results),
			pageParams: data.pageParams,
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

export const useSearch = () => {
	return useQuery({
		queryKey: ['searchInfo', keyword],
		queryFn: () => searchContent(keyword),
	});
};
