'use client';

import { Header } from './components/Header';
import { useQuery } from '@tanstack/react-query';
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

export default function Home() {
	const popular = useQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});

	const nowPlay = useQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});

	const upcoming = useQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});

	// 시리즈
	const popularTv = useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});

	const onTheAir = useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});

	const airingToday = useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});

	if (popular.isLoading) {
		return <Loading />;
	}
	if (nowPlay.isLoading) {
		return <Loading />;
	}
	if (upcoming.isLoading) {
		return <Loading />;
	}
	if (popularTv.isLoading) {
		return <Loading />;
	}
	if (onTheAir.isLoading) {
		return <Loading />;
	}
	if (airingToday.isLoading) {
		return <Loading />;
	}

	if (
		popular.isError ||
		nowPlay.isError ||
		upcoming.isError ||
		popularTv.isError ||
		onTheAir.isError ||
		airingToday.isError
	) {
		return <h1>Error: 문제가 발생했어요.</h1>;
	}

	const popularMovieList = !popular ? null : popular.data.popularMovie?.results;
	const nowPlayMovieList = !nowPlay ? null : nowPlay.data.nowPlayMovie?.results;
	const upcomingMovieList = !upcoming ? null : upcoming.data.upcomingMovie?.results;
	const popularTvList = !popularTv ? null : popularTv.data.popularTv?.results;
	const onTheAirList = !onTheAir ? null : onTheAir.data.onTheAir?.results;
	const airingTodayList = !airingToday ? null : airingToday.data.airingToday?.results;

	const contents = [
		{
			title: '인기 영화',
			content: popularMovieList,
			part: 'movie',
		},
		{
			title: '상영 중인 영화',
			content: nowPlayMovieList,
			part: 'movie',
		},
		{
			title: '개봉 예정 영화',
			content: upcomingMovieList,
			part: 'movie',
		},
		{
			title: '인기 시리즈',
			content: popularTvList,
			part: 'series',
		},
		{
			title: '방송 중인 시리즈',
			content: onTheAirList,
			part: 'series',
		},
		{
			title: '오늘 방송 시리즈',
			content: airingTodayList,
			part: 'series',
		},
	];

	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Header />
			</div>

			{/* Main Contents */}
			<div>
				{contents?.map(({ title, content, part }, index) => {
					return (
						<div key={index} className="mt-8">
							<h1 className="text-xl mb-3 font-extrabold ml-4">{title}</h1>
							<Slider contents={content} part={part} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
