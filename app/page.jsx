'use client';

import { Header } from './components/Header';
import { useQueries } from '@tanstack/react-query';
import {
	getPopularMovie,
	getNowPlayMovie,
	getUpcomingMovie,
	getPopularTv,
	getOnTheAir,
	getAiringToday,
} from './assets/api.js';
import Slider from './components/Slider.jsx';
import Loading from './components/Loading';
import { Suspense } from 'react';

const mainQueries = [
	{ key: 'popularMovie', fn: getPopularMovie, title: '인기 영화', part: 'movie' },
	{ key: 'nowPlayMovie', fn: getNowPlayMovie, title: '상영 중인 영화', part: 'movie' },
	{ key: 'upcomingMovie', fn: getUpcomingMovie, title: '개봉 예정 영화', part: 'movie' },
	{ key: 'popularTv', fn: getPopularTv, title: '인기 시리즈', part: 'series' },
	{ key: 'onTheAir', fn: getOnTheAir, title: '방송 중인 시리즈', part: 'series' },
	{ key: 'airingToday', fn: getAiringToday, title: '오늘 방송 시리즈', part: 'series' },
];

export default function Home() {
	const contents = useQueries({
		queries: mainQueries.map(({ key, fn }) => ({
			queryKey: [key],
			queryFn: fn,
		})),
	});

	const errorCheck = (queries) => {
		return queries.some((query) => query.data?.isError);
	};

	if (errorCheck(contents)) {
		const errorMessage = contents.find((query) => query.error)?.error.message;
		return <h1>Error: {errorMessage}</h1>;
	}

	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Suspense fallback={<Loading />}>
					<Header />
				</Suspense>
			</div>

			{/* Main Contents */}
			<Suspense fallback={<Loading />}>
				{contents &&
					mainQueries.map(({ key, title, part }, index) => {
						return (
							<div key={key} className="mt-8">
								<h1 className="text-xl mb-3 font-extrabold ml-4">{title}</h1>
								<Slider contents={contents[index]?.data?.[key]?.results} part={part} />
							</div>
						);
					})}
			</Suspense>
		</div>
	);
}
