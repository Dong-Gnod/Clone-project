'use client';

import { useEffect, useState } from 'react';
import { ContentList } from '../components/ContentList';
import { TopBtn } from '../components/TopBtn';
import {
	usePopularInfiniteMovie,
	useNowPlayInfiniteMovie,
	useUpcomingInfiniteMovie,
	useTopRatedInfiniteMovie,
} from '../hooks/useFetch';
import Loading from '../components/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import ContentCategory from '../components/ContentCategory';

const categoryRoute = [
	{
		id: 'popularMovie',
		name: '인기 영화',
	},
	{
		id: 'nowPlayMovie',
		name: '상영 중인 영화',
	},
	{
		id: 'upcomingMovie',
		name: '상영 예정 영화',
	},
	{
		id: 'topRated',
		name: '평점 순 영화',
	},
];

export default function MoviePage() {
	const [categories, setCategories] = useState('popularMovie');
	const [popularMovie, setPopularMovie] = useState(null);
	const [nowPlayMovie, setNowPlayMovie] = useState(null);
	const [upcomingMovie, setUpcomingMovie] = useState(null);
	const [topRatedMovie, setTopRatedMovie] = useState(null);

	const {
		data: popular,
		isError: popularIsError,
		error: popularError,
		isFetchingNextPage: popularFetching,
		isLoading: popularLoading,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
		status,
	} = usePopularInfiniteMovie();

	const {
		data: nowPlay,
		isError: nowplayIsError,
		error: nowplayError,
		isFetchingNextPage: nowPlayFetching,
		isLoading: nowPlayLoading,
		fetchNextPage: nowPlayNextPage,
		hasNextPage: nowPlayHasNextPage,
	} = useNowPlayInfiniteMovie();

	const {
		data: upcoming,
		isError: upcomingIsError,
		error: upcomingError,
		isFetchingNextPage: upcomingFetching,
		isLoading: upcomingLoading,
		fetchNextPage: upcomingNextPage,
		hasNextPage: upcomingHasNextPage,
	} = useUpcomingInfiniteMovie();

	const {
		data: topRated,
		isError: topRatedIsError,
		error: topRatedError,
		isFetchingNextPage: topRatedFetching,
		isLoading: topRatedLoading,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useTopRatedInfiniteMovie();

	useEffect(() => {
		if (popular) {
			setPopularMovie(popular);
		}
		if (nowPlay) {
			setNowPlayMovie(nowPlay);
		}
		if (upcoming) {
			setUpcomingMovie(upcoming);
		}
		if (topRated) {
			setTopRatedMovie(topRated);
		}
	}, [popular, nowPlay, upcoming, topRated]);

	const loadMore = () => {
		if (categories === 'popularMovie' && !popularFetching && popularHasNextPage) {
			popularNextPage();
		}
		if (categories === 'nowPlayMovie' && !nowPlayFetching && nowPlayHasNextPage) {
			nowPlayNextPage();
		}

		if (categories === 'upcomingMovie' && !upcomingFetching && upcomingHasNextPage) {
			upcomingNextPage();
		}

		if (categories === 'topRated' && !topRatedFetching && topRatedHasNextPage) {
			topRatedNextPage();
		}
	};

	const hasNext = () => {
		if (categories === 'popularMovie') {
			return popularHasNextPage;
		}
		if (categories === 'nowPlayMovie') {
			return nowPlayHasNextPage;
		}

		if (categories === 'upcomingMovie') {
			return upcomingHasNextPage;
		}

		if (categories === 'topRated') {
			return topRatedHasNextPage;
		}
	};

	const dataLoading = popularLoading || nowPlayLoading || upcomingLoading || topRatedLoading;
	const dataError = popularIsError || nowplayIsError || upcomingIsError || topRatedIsError;

	if (dataLoading) {
		return <Loading />;
	}

	if (dataError) {
		return (
			<>
				<h1>Error: 문제가 발생했어요</h1>
				{popularIsError && <h1>Popular: {popularError.message}</h1>}
				{nowplayIsError && <h1>nowplay: {nowplayError.message}</h1>}
				{upcomingIsError && <h1>upcoming: {upcomingError.message}</h1>}
				{topRatedIsError && <h1>topRated: {topRatedError.message}</h1>}
			</>
		);
	}

	const popularMovieList = popularMovie?.pages;
	const nowPlayMovieList = nowPlayMovie?.pages;
	const upcomingMovieList = upcomingMovie?.pages;
	const topRatedMovieList = topRatedMovie?.pages;

	const contentList = {
		popularMovie: popularMovieList,
		nowPlayMovie: nowPlayMovieList,
		upcomingMovie: upcomingMovieList,
		topRated: topRatedMovieList,
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ContentCategory part={'movie'} categories={categories} onCategories={setCategories} />
			<div className="mt-10">
				<InfiniteScroll
					pageStart={1}
					loadMore={loadMore}
					hasMore={hasNext}
					className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					<ContentList category={contentList[categories]} part={'movie'} />
				</InfiniteScroll>
				<TopBtn />
			</div>
		</div>
	);
}
