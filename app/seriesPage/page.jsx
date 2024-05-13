'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopRatedTv, getPopularTv, getOnTheAir, getAiringToday } from '../assets/api.js';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { ContentList } from '../components/ContentList.jsx';
import { TopBtn } from '../components/TopBtn.jsx';
import {
	usePopularInfiniteTv,
	useOnTheAirInfiniteTv,
	useTodayInfiniteTv,
	useTopRatedInfiniteTv,
} from '../hooks/useFetch.jsx';
import Loading from '../components/Loading.jsx';

const categoryRoute = [
	{
		id: 'popularTv',
		name: '인기 Tv 프로그램',
	},
	{
		id: 'onTheAir',
		name: '방영 중인 프로그램',
	},
	{
		id: 'airingToday',
		name: '오늘 방영 프로그램',
	},
	{
		id: 'topRatedTv',
		name: '평점 순 프로그램',
	},
];

export default function SeriesPage() {
	const [categories, setCategories] = useState('popularTv');

	const {
		data: popular,
		isError: popularStatus,
		isFetching: popularFetching,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = usePopularInfiniteTv();

	const {
		data: onTheAir,
		isError: onTheAirStatus,
		isFetching: onTheAirFetching,
		fetchNextPage: onTheAirNextPage,
		hasNextPage: onTheAirHasNextPage,
	} = useOnTheAirInfiniteTv();

	const {
		data: airingToday,
		isError: airingTodayStatus,
		isFetching: airingTodayFetching,
		fetchNextPage: airingTodayNextPage,
		hasNextPage: airingTodayHasNextPage,
	} = useTodayInfiniteTv();

	const {
		data: topRated,
		isError: topRatedStatus,
		isFetching: topRatedFetching,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useTopRatedInfiniteTv();

	const { ref, inView } = useInView({
		threshold: 0,
		delay: 0,
	});

	useEffect(() => {
		if (inView) {
			loadMore();
		}
	}, [inView]);

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
	/////////////////////////////////////////////

	const dataLoading = popularLoading && nowPlayLoading && upcomingLoading && topRatedLoading;
	const dataFetching = popularFetching || onTheAirFetching || airingTodayFetching || topRatedFetching;
	const dataError = popularStatus || onTheAirStatus || airingTodayStatus || topRatedStatus;
	if (!popular?.pages || !onTheAir?.pages || !airingToday?.pages || !topRated?.pages) {
		return <Loading title={'movie 없음'} />;
	}
	if (dataLoading) {
		return <Loading title={'TV Page'} />;
	}
	if (dataError) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}
	const popularTvList = popular?.pages;
	const onTvList = onTheAir?.pages;
	const todayTvList = airingToday?.pages;
	const topRatedTvList = topRated?.pages;

	const tvByCategory = {
		popularTv: popularTvList,
		onTheAir: onTvList,
		airingToday: todayTvList,
		topRatedTv: topRatedTvList,
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ul className="flex w-dvw justify-center font-black text-xl">
				{categoryRoute.map((category) => {
					return (
						<button
							key={category.id}
							onClick={() => setCategories(category.id)}
							className={`mr-8 pb-2 hover:border-b-4 hover:border-solid hover:border-red-600 ${clsx({
								['border-b-4 border-solid border-red-600']: categories === category.id,
							})}`}>
							<li key={category.id}>{category.name}</li>
						</button>
					);
				})}
			</ul>
			<div className="mt-10">
				<div className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
					<ContentList category={tvByCategory[categories]} part={'series'} />
					<div ref={ref} style={{ height: 20 }} />
				</div>
				<TopBtn />
			</div>
		</div>
	);
}
