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
import {
	usePopularMovie,
	useNowPlayMovie,
	useUpcomingMovie,
	usePopularTv,
	useOnTheAirTv,
	useAiringToday,
} from './hooks/useFetch';
import Loading from './components/Loading';

export default function Home() {
	const { data: popMovie, isError: popMovieError, isLoading: popMovieLoading } = usePopularMovie();
	const { data: nowPlay, isError: nowPlayError, isLoading: nowPlayLoading } = useNowPlayMovie();
	const { data: upcoming, isError: upcomingError, isLoading: upcomingLoading } = useUpcomingMovie();
	const { data: popTv, isError: popTvError, isLoading: popTvLoading } = usePopularTv();
	const { data: onTheAirTv, isError: onTheAirTvError, isLoading: onTheAirTvLoading } = useOnTheAirTv();
	const { data: todayTv, isError: todayTvError, isLoading: todayTvLoading } = useAiringToday();

	if (popMovieError || nowPlayError || upcomingError) {
		return <h1>Movie Error</h1>;
	}
	if (popTvError || onTheAirTvError || todayTvError) {
		return <h1>Tv Error</h1>;
	}
	if (popMovieLoading || nowPlayLoading || upcomingLoading || popTvLoading || onTheAirTvLoading || todayTvLoading) {
		return <Loading />;
	}
	const popularMovie = popMovie.popularMovie?.results;
	const nowPlayMovie = nowPlay.nowPlayMovie?.results;
	const upcomingMovie = upcoming.upcomingMovie?.results;
	const popTvSeries = popTv.popularTv?.results;
	const onTheAirTvSeries = onTheAirTv.onTheAir?.results;
	const todayTvSeries = todayTv.airingToday?.results;

	return (
		<div className="w-screen h-full font-RobotoMono">
			<div className="w-full flex justify-center">
				<Header />
			</div>

			{/* Main Contents */}
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
				<Slider contents={popTvSeries} part={'series'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">방송 중인 시리즈</h1>
				<Slider contents={onTheAirTvSeries} part={'series'} />
			</div>
			<div className="mt-8">
				<h1 className="text-xl mb-3 font-extrabold ml-4">오늘 방송 시리즈</h1>
				<Slider contents={todayTvSeries} part={'series'} />
			</div>
		</div>
	);
}
