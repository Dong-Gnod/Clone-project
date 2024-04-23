'use client';

import { Header } from './components/Header';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
	getPopularMovie,
	getNowPlayMovie,
	getUpcomingMovie,
	getPopularTv,
	getOnTheAir,
	getAiringToday,
} from './assets/api.js';
import Slider from './components/Slider.jsx';

const movieQueries = [
	{ key: 'popularMovie', fn: getPopularMovie, title: '인기 영화', part: 'movie' },
	{ key: 'nowPlayMovie', fn: getNowPlayMovie, title: '상영 중인 영화', part: 'movie' },
	{ key: 'upcomingMovie', fn: getUpcomingMovie, title: '상영 예정인 영화', part: 'movie' },
];

const tvQueries = [
	{ key: 'popularTv', fn: getPopularTv, title: '인기 시리즈', part: 'series' },
	{ key: 'onTheAir', fn: getOnTheAir, title: '방영 중인 시리즈', part: 'series' },
	{ key: 'airingToday', fn: getAiringToday, title: '오늘 방영 시리즈', part: 'series' },
];

export default function Home() {
	const movieResults = useSuspenseQueries({
		queries: movieQueries.map(({ key, fn }) => ({ queryKey: [key], queryFn: fn })),
	});
	const tvResults = useSuspenseQueries({
		queries: tvQueries.map(({ key, fn }) => ({ queryKey: [key], queryFn: fn })),
	});

	const getResults = (results) => results.map((query) => query.data) ?? [];

	// 에러 체크 함수
	const checkError = (results) => results.some((query) => query.error);

	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Header />
			</div>
			{/* Main Contents */}
			<div>
				{movieResults &&
					movieQueries.map(({ title, part }, index) => (
						<div key={index} className="mt-8">
							<h1 className="text-xl mb-3 font-extrabold ml-4">{title}</h1>
							{checkError(movieResults) ? (
								<p className="text-red-500 ml-4">데이터를 불러오는 중 에러가 발생했습니다.</p>
							) : (
								<Slider
									contents={getResults(movieResults)[index][movieQueries[index].key].results}
									part={part}
								/>
							)}
						</div>
					))}

				{tvResults &&
					tvQueries.map(({ title, part }, index) => (
						<div key={index} className="mt-8">
							<h1 className="text-xl mb-3 font-extrabold ml-4">{title}</h1>
							{checkError(tvResults) ? (
								<p className="text-red-500 ml-4">데이터를 불러오는 중 에러가 발생했습니다.</p>
							) : (
								<Slider
									contents={getResults(tvResults)[index][tvQueries[index].key].results}
									part={part}
								/>
							)}
						</div>
					))}
			</div>
		</div>
	);
}
