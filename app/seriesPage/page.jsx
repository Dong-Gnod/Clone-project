'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getTopRatedTv, getPopularTv, getOnTheAir, getAiringToday } from '../assets/api.js';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { ContentList } from '../components/ContentList.jsx';
import { TopBtn } from '../components/TopBtn.jsx';

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
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['popularTv'],
		queryFn: ({ pageParam = 1 }) => getPopularTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: onTheAir,
		isError: onTheAirStatus,
		fetchNextPage: onTheAirNextPage,
		hasNextPage: onTheAirHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['onTheAir'],
		queryFn: ({ pageParam = 1 }) => getOnTheAir({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: airingToday,
		isError: airingTodayStatus,
		fetchNextPage: airingTodayNextPage,
		hasNextPage: airingTodayHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['airingToday'],
		queryFn: ({ pageParam = 1 }) => getAiringToday({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: topRated,
		isError: topRatedStatus,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['topRatedTv'],
		queryFn: ({ pageParam = 1 }) => getTopRatedTv({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

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
			popularHasNextPage && popularNextPage();
		}
		if (categories === 'onTheAir') {
			onTheAirHasNextPage && onTheAirNextPage();
		}

		if (categories === 'airingToday') {
			airingTodayHasNextPage && airingTodayNextPage();
		}

		if (categories === 'topRatedTv') {
			topRatedHasNextPage && topRatedNextPage();
		}
	};

	if (popularStatus || onTheAirStatus || airingTodayStatus || topRatedStatus) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}

	const popularTvList = popular?.pages.flatMap((page) => page[categories]?.results) ?? [];
	const onTvList = onTheAir?.pages.flatMap((page) => page[categories]?.results) ?? [];
	const todayTvList = airingToday?.pages.flatMap((page) => page[categories]?.results) ?? [];
	const topRatedTvList = topRated?.pages.flatMap((page) => page[categories]?.results) ?? [];

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
					<ContentList category={tvByCategory} current={categories} />
					<div ref={ref} style={{ height: 20 }} />
				</div>
				<TopBtn />
			</div>
		</div>
	);
}
