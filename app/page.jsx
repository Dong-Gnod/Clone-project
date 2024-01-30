'use client';

import Link from 'next/link';
import Header from './components/Header';
import Nav from './components/Nav';
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

	if (!popular.data) {
		return <h1>데이터를 불러오지 못했습니다.</h1>;
	}

	if (!popularSeries.data) {
		return;
	}

	const popularMovieList = popular.data.popularMovie.results;
	const nowPlayMovieList = nowPlay.data.nowPlayMovie.results;
	const upcomingMovieList = upcoming.data.upcomingMovie.results;
	const headerImage = popularMovieList[Math.floor(Math.random() * popularMovieList.length - 1)];

	const popularTvList = popularSeries.data.popularTv.results;
	const onTheAirList = onTheAirSeries.data.onTheAir.results;
	const airingTodayList = airingTodaySeries.data.airingToday.results;

	return (
		<div className="w-full h-full font-RobotoMono">
			<Nav />
			<div className="w-full flex justify-center">
				<Link key={headerImage.id} href={`detail/${headerImage.id}`}>
					<Header
						key={headerImage.id}
						id={headerImage.id}
						title={headerImage.title}
						headerImage={headerImage.backdrop_path}
					/>
					<div className="text-black z-[90] absolute top-[65%] left-[25%] w-1/2 bg-gray-400/50 p-3 rounded-md mx-auto text-center">
						<p className="font-extrabold text-xl mb-2.5 border-b-solid border-b-white border-b-2 pb-0.5 w-80 mx-auto">
							{headerImage.title}
						</p>
						<p className="font-semibold line-clamp-3 m-10">
							{headerImage.overview ? headerImage.overview : '설명이 없습니다.'}
						</p>
					</div>
				</Link>
			</div>
			{/* Main Contents */}
			<div>
				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">인기 영화</h1>
					<Slider contents={popularMovieList} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">상영 중인 영화</h1>
					<Slider contents={nowPlayMovieList} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">상영 예정인 영화</h1>
					<Slider contents={upcomingMovieList} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">인기 시리즈</h1>
					<Slider contents={popularTvList} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">방영 중인 시리즈</h1>
					<Slider contents={onTheAirList} />
				</div>

				<div className="mt-8">
					<h1 className="text-xl mb-3 font-extrabold ml-4">오늘 방영 시리즈</h1>
					<Slider contents={airingTodayList} />
				</div>
			</div>
			{/* Main */}
		</div>
	);
}
