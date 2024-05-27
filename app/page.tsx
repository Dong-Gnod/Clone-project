'use client';

import { Header } from './components/Header';
import Slider from './components/Slider.tsx';
import {
	usePopularMovie,
	useNowPlayMovie,
	useUpcomingMovie,
	usePopularTv,
	useOnTheAirTv,
	useAiringToday,
} from './hooks/useFetch';
import Loading from './components/Loading';
import React from 'react';

export default function Home() {
	const { data: popMovie, isError: popMovieError, isLoading: popMovieLoading } = usePopularMovie();
	const { data: nowPlay, isError: nowPlayError, isLoading: nowPlayLoading } = useNowPlayMovie();
	const { data: upcoming, isError: upcomingError, isLoading: upcomingLoading } = useUpcomingMovie();
	const { data: popTv, isError: popTvError, isLoading: popTvLoading } = usePopularTv();
	const { data: onTheAirTv, isError: onTheAirTvError, isLoading: onTheAirTvLoading } = useOnTheAirTv();
	const { data: todayTv, isError: todayTvError, isLoading: todayTvLoading } = useAiringToday();

	const dataLoading =
		popMovieLoading || nowPlayLoading || upcomingLoading || popTvLoading || onTheAirTvLoading || todayTvLoading;

	if (popMovieError || nowPlayError || upcomingError) {
		return <h1>Movie Error</h1>;
	}
	if (popTvError || onTheAirTvError || todayTvError) {
		return <h1>Tv Error</h1>;
	}
	if (dataLoading) {
		return <Loading />;
	}
	const popularMovie = popMovie?.results;
	const nowPlayMovie = nowPlay?.results;
	const upcomingMovie = upcoming?.results;
	const popTvSeries = popTv?.results;
	const onTheAirTvSeries = onTheAirTv?.results;
	const todayTvSeries = todayTv?.results;

	return dataLoading ? (
		<Loading />
	) : (
		<>
			<div className="w-full flex justify-center">
				<Header />
			</div>

			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">인기 영화</h1>
				<Slider contents={popularMovie} part={'movie'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">상영 중인 영화</h1>
				<Slider contents={nowPlayMovie} part={'movie'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">개봉 예정 영화</h1>
				<Slider contents={upcomingMovie} part={'movie'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">인기 시리즈</h1>
				<Slider contents={popTvSeries} part={'tv'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">방송 중인 시리즈</h1>
				<Slider contents={onTheAirTvSeries} part={'tv'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">오늘 방송 시리즈</h1>
				<Slider contents={todayTvSeries} part={'tv'} />
			</div>
		</>
	);
}
