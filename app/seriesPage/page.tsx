'use client';

import { useState } from 'react';
import { ContentList } from '../components/ContentList';
import { TopBtn } from '../components/TopBtn';
import {
	usePopularInfiniteTv,
	useOnTheAirInfiniteTv,
	useTodayInfiniteTv,
	useTopRatedInfiniteTv,
} from '../hooks/useFetch';
import Loading from '../components/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import ContentCategory from '../components/ContentCategory';
import { ContentsObject, MoviePageData } from '../model/Movies';
import { InfiniteData } from '@tanstack/react-query';

export default function SeriesPage() {
	const [categories, setCategories] = useState('popularTv');
	const {
		data: popular,
		isError: popularStatus,
		error: popularError,
		isFetchingNextPage: popularFetching,
		isLoading: popularLoading,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = usePopularInfiniteTv();

	const {
		data: onTheAir,
		isError: onTheAirStatus,
		error: onTheAirError,
		isFetchingNextPage: onTheAirFetching,
		isLoading: onTheAirLoading,
		fetchNextPage: onTheAirNextPage,
		hasNextPage: onTheAirHasNextPage,
	} = useOnTheAirInfiniteTv();

	const {
		data: airingToday,
		isError: airingTodayStatus,
		error: airingTodayError,
		isFetchingNextPage: airingTodayFetching,
		isLoading: todayLoading,
		fetchNextPage: airingTodayNextPage,
		hasNextPage: airingTodayHasNextPage,
	} = useTodayInfiniteTv();

	const {
		data: topRated,
		isError: topRatedStatus,
		error: topRatedError,
		isFetchingNextPage: topRatedFetching,
		isLoading: topRatedLoading,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useTopRatedInfiniteTv();

	const loadMore = () => {
		if (categories === 'popularTv') {
			!popularFetching && popularHasNextPage && popularNextPage();
		}
		if (categories === 'onTheAir') {
			!onTheAirFetching && onTheAirHasNextPage && onTheAirNextPage();
		}

		if (categories === 'airingToday') {
			!airingTodayFetching && airingTodayHasNextPage && airingTodayNextPage();
		}

		if (categories === 'topRatedTv') {
			!topRatedFetching && topRatedHasNextPage && topRatedNextPage();
		}
	};

	const hasNext = () => {
		if (categories === 'popularTv') {
			return popularHasNextPage;
		}
		if (categories === 'onTheAir') {
			return onTheAirHasNextPage;
		}

		if (categories === 'airingToday') {
			return airingTodayHasNextPage;
		}

		if (categories === 'topRatedTv') {
			return topRatedHasNextPage;
		}
	};

	const data = popular || onTheAir || airingToday || topRated;
	const dataLoading = popularLoading && onTheAirLoading && todayLoading && topRatedLoading;
	const dataError = popularStatus || onTheAirStatus || airingTodayStatus || topRatedStatus;
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
				{popularError && <h1>Popular: {popularError.message}</h1>}
				{onTheAirError && <h1>nowplay: {onTheAirError.message}</h1>}
				{airingTodayError && <h1>upcoming: {airingTodayError.message}</h1>}
				{topRatedError && <h1>topRated: {topRatedError.message}</h1>}
			</>
		);
	}

	const changeData = (data: InfiniteData<MoviePageData> | undefined) => {
		return data?.pages.flatMap((page: MoviePageData) => page?.results) || [];
	};

	const popularTvList = changeData(popular);
	const onTvList = changeData(onTheAir);
	const todayTvList = changeData(airingToday);
	const topRatedTvList = changeData(topRated);

	const contentList: ContentsObject = {
		popularTv: popularTvList,
		onTheAir: onTvList,
		airingToday: todayTvList,
		topRatedTv: topRatedTvList,
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ul className="flex w-dvw justify-center font-black text-xl">
				<ContentCategory part={'series'} categories={categories} onCategories={setCategories} />
			</ul>
			<div className="mt-10">
				<InfiniteScroll
					pageStart={1}
					loadMore={loadMore}
					hasMore={hasNext()}
					className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					<ContentList category={contentList[categories]} part={'tv'} />
				</InfiniteScroll>
				<TopBtn />
			</div>
		</div>
	);
}
