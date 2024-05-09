'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovie, getNowPlayMovie, getUpcomingMovie, getTopRatedMovie } from '../assets/api';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/Loading';
import { ContentList } from '../components/ContentList';
import { TopBtn } from '../components/TopBtn';

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
	const [showTop, setShowTop] = useState(false);

	const {
		data: popular,
		isError: popularError,
		isLoading: popularLoading,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['popularMovie'],
		queryFn: ({ pageParam = 1 }) => getPopularMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	console.log(popular);

	const {
		data: nowPlay,
		isError: nowplayError,
		isLoading: nowPlayLoading,
		fetchNextPage: nowPlayNextPage,
		hasNextPage: nowPlayHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: ({ pageParam = 1 }) => getNowPlayMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	const {
		data: upcoming,
		isError: upcomingError,
		isLoading: upcomingLoading,
		fetchNextPage: upcomingNextPage,
		hasNextPage: upcomingHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['upcomingMovie'],
		queryFn: ({ pageParam = 1 }) => getUpcomingMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			if (pages.length === 0) {
				return;
			}
			return lastPage.nextPageParam;
		},
		maxPages: 100,
	});

	const {
		data: topRated,
		isError: topRatedError,
		isLoading: topRatedLoading,

		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useInfiniteQuery({
		queryKey: ['topRated'],
		queryFn: ({ pageParam = 1 }) => getTopRatedMovie({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPageParam,
		maxPages: 100,
	});

	// /////////////////////////////////////////
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
		if (categories === 'popularMovie') {
			popularHasNextPage && popularNextPage();
		}
		if (categories === 'nowPlayMovie') {
			nowPlayHasNextPage && nowPlayNextPage();
		}

		if (categories === 'upcomingMovie') {
			upcomingHasNextPage && upcomingNextPage();
		}

		if (categories === 'topRated') {
			topRatedHasNextPage && topRatedNextPage();
		}
	};

	// /////////////////////////////////////////
	const dataLoading = popularLoading && nowPlayLoading && upcomingLoading && topRatedLoading;
	const dataError = popularError || nowplayError || upcomingError || topRatedError;

	if (dataError) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}

	const popularMovieList = popular?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const nowPlayMovieList = nowPlay?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const upcomingMovieList = upcoming?.pages?.flatMap((page) => page[categories]?.results) ?? [];
	const topRatedMovieList = topRated?.pages?.flatMap((page) => page[categories]?.results) ?? [];

	const moviesByCategory = {
		popularMovie: popularMovieList,
		nowPlayMovie: nowPlayMovieList,
		upcomingMovie: upcomingMovieList,
		topRated: topRatedMovieList,
	};

	return (
		<div className="w-screen flex flex-col justify-center mt-20">
			<ul className="flex w-dvw justify-center font-black text-xl mt-10">
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
					{dataLoading ? null : <ContentList category={moviesByCategory} current={categories} />}

					<div ref={ref} style={{ height: 20 }} />
				</div>
				{showTop && <TopBtn onShowTop={setShowTop} />}
			</div>
		</div>
	);
}
