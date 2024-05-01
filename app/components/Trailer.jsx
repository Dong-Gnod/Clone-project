'use client';

import { useQuery } from '@tanstack/react-query';
import { getVideo, getGenresList } from '../assets/api';
import Loading from './Loading';
import Image from 'next/image';

export function Trailer({ id, poster, title, overview, genre, average, part }) {
	const {
		data: video,
		error: videoError,
		isLoading: videoLoading,
	} = useQuery({
		queryKey: ['movieVideo', part, id],
		queryFn: () => getVideo(part, id),
	});

	const {
		data: genresData,
		error: genresError,
		isLoading: genreLoading,
	} = useQuery({
		queryKey: ['genres'],
		queryFn: getGenresList,
	});

	if (videoLoading || genreLoading) {
		return <Loading />;
	}

	if (videoError || genresError) {
		return <h1>Error: {videoError ? videoError.message : genresError.message}</h1>;
	}

	const videoList = video?.movieVideo.results;

	const genreList = genresData?.genres.genres;

	const trailer = videoList.find((video) => video.type === 'Trailer');
	console.log(trailer);

	return (
		<>
			{!trailer ? (
				<Image id={id} src={`https://image.tmdb.org/t/p/original/${poster}`} fill={true} alt="header-image" />
			) : (
				<iframe
					className="w-screen h-screen"
					src={`https://www.youtube.com/embed/${trailer.key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${trailer.key}`}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
			)}
			<div className="text-white z-[90] absolute top-[35%] left-[5%] w-1/3">
				<h1 className="font-black text-4xl drop-shadow-2xl mb-3">{title}</h1>
				<div>
					{genreList &&
						genreList.map((gl) => {
							if (genre.includes(gl.id)) {
								return (
									<span key={gl.id} className="mr-2 mb-2">
										{gl.name}
									</span>
								);
							}
						})}
				</div>
				<div className="text-2xl mb-3">⭐평점: {average}</div>
				<div className="font-bold text-3xl w-full drop-shadow-2xl line-clamp-3">
					{!overview ? <h1>영화에 대한 소개가 없습니다.</h1> : <p>{overview}</p>}
				</div>
			</div>
		</>
	);
}
