'use client';

import { useState } from 'react';
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
import { ContentsObject, MoviePageData } from '../model/Movies';
import { InfiniteData } from '@tanstack/react-query';

export default function MoviePage() {
	const [categories, setCategories] = useState('popularMovie');

	const {
		data: popular,
		isError: popularIsError,
		error: popularError,
		isFetchingNextPage: popularFetching,
		isLoading: popularLoading,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
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

	const data = popular || nowPlay || upcoming || topRated;
	const dataLoading = popularLoading || nowPlayLoading || upcomingLoading || topRatedLoading;
	const dataError = popularIsError || nowplayIsError || upcomingIsError || topRatedIsError;

	if (!data) {
		return <Loading />;
	}
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

	const changeData = (data: InfiniteData<MoviePageData> | undefined) => {
		if (!data) {
			return;
		}
		return data?.pages.flatMap((page: MoviePageData) => page?.results) || [];
	};

	const popularMovieList = changeData(popular);
	const nowPlayMovieList = changeData(nowPlay);
	const upcomingMovieList = changeData(upcoming);
	const topRatedMovieList = changeData(topRated);

	const contentList: ContentsObject = {
		popularMovie: popularMovieList || [],
		nowPlayMovie: nowPlayMovieList || [],
		upcomingMovie: upcomingMovieList || [],
		topRated: topRatedMovieList || [],
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ContentCategory part={'movie'} categories={categories} onCategories={setCategories} />
			<div className="mt-10">
				<InfiniteScroll
					pageStart={1}
					loadMore={loadMore}
					hasMore={hasNext()}
					className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					<ContentList category={contentList[categories]} part={'movie'} />
				</InfiniteScroll>
				<TopBtn />
			</div>
		</div>
	);
}
