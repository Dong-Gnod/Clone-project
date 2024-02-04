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

	// Tv
	const popularSeries = useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});

	const onTheAirSeries = useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});

	const airingTodaySeries = useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});

	const popularMovieList = popular.isLoading ? null : popular.data.popularMovie.results;
	const nowPlayMovieList = nowPlay.isLoading ? null : nowPlay.data.nowPlayMovie.results;
	const upcomingMovieList = upcoming.isLoading ? null : upcoming.data.upcomingMovie.results;
	const popularTvList = popularSeries.isLoading ? null : popularSeries.data.popularTv.results;
	const onTheAirList = onTheAirSeries.isLoading ? null : onTheAirSeries.data.onTheAir.results;
	const airingTodayList = airingTodaySeries.isLoading ? null : airingTodaySeries.data.airingToday.results;
	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Header />
			</div>
			{/* Main Contents */}
			<div>
				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">인기 영화</h1>
					<Slider contents={popularMovieList} part={'movie'} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">상영 중인 영화</h1>
					<Slider contents={nowPlayMovieList} part={'movie'} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">상영 예정인 영화</h1>
					<Slider contents={upcomingMovieList} part={'movie'} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">인기 시리즈</h1>
					<Slider contents={popularTvList} part={'series'} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">방영 중인 시리즈</h1>
					<Slider contents={onTheAirList} part={'series'} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">오늘 방영 시리즈</h1>
					<Slider contents={airingTodayList} part={'series'} />
				</div>
			</div>
		</div>
	);
}
