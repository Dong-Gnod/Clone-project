'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopRatedTv, getPopularTv, getOnTheAir, getAiringToday, getTvList } from '../assets/api.js';
import Link from 'next/link';
import clsx from 'clsx';

export default function SeriesPage() {
	const [categories, setCategories] = useState('');
	const categoryRoute = [
		{
			id: 'popular',
			name: '인기 Tv 프로그램',
		},
		{
			id: 'on-The-Air',
			name: '상영 중인 영화',
		},
		{
			id: 'airing-Today',
			name: '상영 예정 영화',
		},
		{
			id: 'toprated',
			name: '평점 순 영화',
		},
	];

	const getTv = useQuery({
		queryKey: ['tvSeriesList'],
		queryFn: getTvList,
	});

	const getPopular = useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});
	const getOnTheAiring = useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});
	const getToday = useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
	const getTopRated = useQuery({
		queryKey: ['topRatedTv'],
		queryFn: getTopRatedTv,
	});

	if (getPopular.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getPopular.status === 'error') {
		<h1>Error: {getPopular.error.message}</h1>;
	}

	if (getOnTheAiring.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getOnTheAiring.status === 'error') {
		<h1>Error: {getOnTheAiring.error.message}</h1>;
	}

	if (getToday.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getToday.status === 'error') {
		<h1>Error: {getToday.error.message}</h1>;
	}

	if (getTopRated.status === 'loading') {
		return <h1>Loading...</h1>;
	} else if (getTopRated.status === 'error') {
		<h1>Error: {getTopRated.error.message}</h1>;
	}

	if (!getPopular.data || !getOnTheAiring.data || !getToday.data || !getTopRated.data) {
		return <h1>Loading...</h1>;
	}

	const seriesList = getTv.data.tvSeriesList.results;
	const popularTvList = getPopular.data.popularTv.results;
	const onTvList = getOnTheAiring.data.onTheAir.results;
	const todayTvList = getToday.data.airingToday.results;
	const topRatedTvList = getTopRated.data.topRatedTv.results;

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
			<div className="flex justify-center mt-10">
				{categories === '' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{seriesList.map((series) => {
							if (!series.poster_path) return;
							return (
								<Link key={series.id} href={`detail/${series.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'popular' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{popularTvList.map((series) => {
							if (!series.poster_path) return;
							return (
								<Link key={series.id} href={`detail/${series.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'on-The-Air' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{onTvList.map((series) => {
							if (!series.poster_path) return;
							return (
								<Link key={series.id} href={`detail/${series.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'airing-Today' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{todayTvList.map((series) => {
							if (!series.poster_path) return;
							return (
								<Link key={series.id} href={`detail/${series.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}

				{categories === 'toprated' ? (
					<div className="w-9/12 flex flex-wrap gap-5 justify-center">
						{topRatedTvList.map((series) => {
							if (!series.poster_path) return;
							return (
								<Link key={series.id} href={`detail/${series.id}`}>
									<div className="w-48 transition-all duration-300 hover:scale-150">
										<img
											src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
											alt="poster"
										/>
									</div>
								</Link>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
}
