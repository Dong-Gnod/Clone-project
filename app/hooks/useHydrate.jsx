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
} from '../assets/api';

export default async function InitialContents({ children }) {
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

	const dehydrateState = dehydrate(queryClient);
	return <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>;
}
