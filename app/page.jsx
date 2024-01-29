'use client';

import Link from 'next/link';
import Header from './components/Header';
import Nav from './components/Nav';
import TopTen from './components/TopTen';
import { useQuery } from '@tanstack/react-query';
import { getMovie, getTv } from './assets/api.js';
import Series from './components/Series';
import Slider from './components/Slider.jsx';

export default function Home() {
	const movieItems = useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	const tvItems = useQuery({
		queryKey: ['tvList'],
		queryFn: getTv,
	});

	if (!movieItems.data) {
		return;
	}

	if (!tvItems.data) {
		return;
	}

	const movies = movieItems.data.movieList.results;
	console.log(movies);
	const headerImage = movies[Math.floor(Math.random() * movies.length - 1)];

	const series = tvItems.data.tvList.results;

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
			<div className="translate-y-[-2%] overflow-x-hidden max-w-screen-3xl relative">
				<div>
					<div className="w-screen mb-5 h-full">
						<h1 className="ml-2.5 text-3xl font-bold mb-1.5 bg-gray-600/50 p-3 rounded-md w-[15%]">
							지금 상영 중인 콘텐츠
						</h1>
						<div className="w-full h-48">
							<Slider contents={movies} />
						</div>
					</div>

					<div className="mb-7">
						<h1 className="ml-2.5 text-3xl font-bold mb-7">인기 콘텐츠</h1>
						<div className="flex justify-between relative mt-12">
							<Slider contents={movies} />
						</div>
					</div>
				</div>

				<div>
					<div className="w-screen mb-5 h-full">
						<h1 className="ml-2.5 text-3xl font-bold mb-1.5 bg-gray-600/50 p-3 rounded-md w-[15%]">
							지금 뜨는 콘텐츠
						</h1>
						<div className="w-full h-48">
							<Slider contents={series} />
						</div>
					</div>

					<div className="mb-7">
						<h1 className="ml-2.5 text-3xl font-bold mb-7">인기 콘텐츠</h1>
						<div className="flex justify-between relative mt-12">
							<Slider contents={series} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
