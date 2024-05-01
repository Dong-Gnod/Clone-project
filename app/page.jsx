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
import { useEffect, useState } from 'react';
import Loading from './components/Loading';

export default function Home() {
	const [movieData, setMovieData] = useState([]);
	const [tvData, setTvData] = useState([]);

	const movieCategry = ['인기 영화', '상영 중인 영화', '개봉 예정 영화'];
	const tvCategry = ['인기 시리즈', '방송 중인 시리즈', '오늘 방송 시리즈'];

	const {
		data: popular,
		error: popularError,
		isLoading: popularLoading,
	} = useQuery({
		queryKey: ['popularMovie'],
		queryFn: getPopularMovie,
	});

	const {
		data: nowPlay,
		error: nowPlayError,
		isLoading: nowPlayLoading,
	} = useQuery({
		queryKey: ['nowPlayMovie'],
		queryFn: getNowPlayMovie,
	});

	const {
		data: upcoming,
		error: upcomingError,
		isLoading: upcomingLoading,
	} = useQuery({
		queryKey: ['upcomingMovie'],
		queryFn: getUpcomingMovie,
	});

	// 시리즈
	const {
		data: popularTv,
		error: popularTvError,
		isLoading: popularTvLoading,
	} = useQuery({
		queryKey: ['popularTv'],
		queryFn: getPopularTv,
	});

	const {
		data: onTheAir,
		error: onTheAirError,
		isLoading: onTheAirLoading,
	} = useQuery({
		queryKey: ['onTheAir'],
		queryFn: getOnTheAir,
	});

	const {
		data: airingToday,
		error: airingTodayError,
		isLoading: airingTodayLoading,
	} = useQuery({
		queryKey: ['airingToday'],
		queryFn: getAiringToday,
	});
	/////

	useEffect(() => {
		if (popular && nowPlay && upcoming) {
			setMovieData([popular.popularMovie.results, nowPlay.nowPlayMovie.results, upcoming.upcomingMovie.results]);
		}
	}, [popular, nowPlay, upcoming]);

	useEffect(() => {
		if (popularTv && onTheAir && airingToday) {
			setTvData([popularTv.popularTv.results, onTheAir.onTheAir.results, airingToday.airingToday.results]);
		}
	}, [popularTv, onTheAir, airingToday]);
	if (
		popularLoading ||
		nowPlayLoading ||
		upcomingLoading ||
		popularTvLoading ||
		onTheAirLoading ||
		airingTodayLoading
	) {
		return <Loading />;
	}

	if (popularError || nowPlayError || upcomingError) {
		return <h1>데이터를 가져오다가 에러가 발생했어요.</h1>;
	}

	if (popularTvError || onTheAirError) {
		return <h1>Error: {popularTvError ? popularTvError.message : onTheAirError.message} </h1>;
	}
	if (airingTodayError) {
		return <h1>Error : {airingTodayError.message}</h1>;
	}

	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Header />
			</div>

			{/* Main Contents */}
			<div>
				{movieData.map((result, index) => (
					<div key={index} className="mt-8">
						<h1 className="text-xl mb-3 font-extrabold ml-4">{movieCategry[index]}</h1>
						<Slider contents={result} part={'movie'} />
					</div>
				))}

				{tvData.map((result, index) => (
					<div key={index} className="mt-8">
						<h1 className="text-xl mb-3 font-extrabold ml-4">{tvCategry[index]}</h1>
						<Slider contents={result} part={'series'} />
					</div>
				))}
			</div>
		</div>
	);
}
