'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Loading from '../components/Loading';
import { ContentList } from '../components/ContentList';
import { TopBtn } from '../components/TopBtn';
import {
	usePopularInfiniteMovie,
	useNowPlayInfiniteMovie,
	useUpcomingInfiniteMovie,
	useTopRatedInfiniteMovie,
} from '../hooks/useFetch';

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
	const {
		data: popular,
		isError: popularError,
		isFetching: popularFetching,
		isLoading: popularLoading,
		fetchNextPage: popularNextPage,
		hasNextPage: popularHasNextPage,
	} = usePopularInfiniteMovie();
	console.log(popular);
	const {
		data: nowPlay,
		isError: nowplayError,
		isFetching: nowPlayFetching,
		isLoading: nowPlayLoading,
		fetchNextPage: nowPlayNextPage,
		hasNextPage: nowPlayHasNextPage,
	} = useNowPlayInfiniteMovie();

	const {
		data: upcoming,
		isError: upcomingError,
		isFetching: upcomingFetching,
		isLoading: upcomingLoading,
		fetchNextPage: upcomingNextPage,
		hasNextPage: upcomingHasNextPage,
	} = useUpcomingInfiniteMovie();

	const {
		data: topRated,
		isError: topRatedError,
		isFetching: topRatedFetching,
		isLoading: topRatedLoading,
		fetchNextPage: topRatedNextPage,
		hasNextPage: topRatedHasNextPage,
	} = useTopRatedInfiniteMovie();

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
			!popularFetching && popularHasNextPage && popularNextPage();
		}
		if (categories === 'nowPlayMovie') {
			!nowPlayFetching && nowPlayHasNextPage && nowPlayNextPage();
		}

		if (categories === 'upcomingMovie') {
			!upcomingFetching && upcomingHasNextPage && upcomingNextPage();
		}

		if (categories === 'topRated') {
			!topRatedFetching && topRatedHasNextPage && topRatedNextPage();
		}
	};

	// /////////////////////////////////////////
	const dataLoading = popularLoading && nowPlayLoading && upcomingLoading && topRatedLoading;
	const dataFetching = popularFetching || nowPlayFetching || upcomingFetching || topRatedFetching;
	const dataError = popularError || nowplayError || upcomingError || topRatedError;
	if (!popular?.pages || !nowPlay?.pages || !upcoming?.pages || !topRated?.pages) {
		return <Loading title={'movie 없음'} />;
	}
	if (dataLoading) {
		return <Loading title={'Movie Page'} />;
	}
	if (dataError) {
		return <h1>Error: 문제가 발생했어요</h1>;
	}
	const popularMovieList = popular.pages;
	const nowPlayMovieList = nowPlay.pages;
	const upcomingMovieList = upcoming.pages;
	const topRatedMovieList = topRated.pages;

	const movieByCategory = {
		popularMovie: popularMovieList,
		nowPlayMovie: nowPlayMovieList,
		upcomingMovie: upcomingMovieList,
		topRated: topRatedMovieList,
	};

	return (
		<>
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
						<ContentList category={movieByCategory[categories]} part={'movie'} />
						<div ref={ref} style={{ height: 20 }} />
					</div>
					<TopBtn />
				</div>
			</div>
		</>
	);
}
