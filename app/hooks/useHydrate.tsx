import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import {
	getMovie,
	getPopularMovie,
	getNowPlayMovie,
	getUpcomingMovie,
	getTopRatedMovie,
	getPopularTv,
	getTopRatedTv,
	getOnTheAir,
	getAiringToday,
	getPopularMovieInfinite,
	getNowPlayMovieInfinite,
	getUpcomingMovieInfinite,
	getTopRatedMovieInfinite,
	getPopularTvInfinite,
	getOnTheAirInfinite,
	getAiringTodayInfinite,
	getTopRatedTvInfinite,
} from '../assets/api';
import { ReactNode } from 'react';

export default async function InitialContents({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});
	await queryClient.prefetchQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});
	await queryClient.prefetchQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});
	await queryClient.prefetchQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});
	await queryClient.prefetchQuery({
		queryKey: ['topRated'],
		queryFn: getTopRatedMovie,
	});
	await queryClient.prefetchQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});
	await queryClient.prefetchQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});
	await queryClient.prefetchQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
	await queryClient.prefetchQuery({
		queryKey: ['topRatedTv'],
		queryFn: getTopRatedTv,
	});

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: getTopRatedTv,
		initialPageParam: 1,
	});

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['popularInfiniteMovie'],
		queryFn: getPopularMovieInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['nowPlayInfiniteMovie'],
		queryFn: getNowPlayMovieInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['upcomingInfiniteMovie'],
		queryFn: getUpcomingMovieInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['topRatedInfinite'],
		queryFn: getTopRatedMovieInfinite,
		initialPageParam: 1,
	});

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['popularInfiniteTv'],
		queryFn: getPopularTvInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['onTheAirInfinite'],
		queryFn: getOnTheAirInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['airingTodayInfinite'],
		queryFn: getAiringTodayInfinite,
		initialPageParam: 1,
	});
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['topRatedInfiniteTv'],
		queryFn: getTopRatedTvInfinite,
		initialPageParam: 1,
	});

	const dehydrateState = dehydrate(queryClient);
	return <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>;
}
