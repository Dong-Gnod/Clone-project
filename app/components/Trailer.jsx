'use client';

import { useQuery } from '@tanstack/react-query';
import { getVideo, getGenresList } from '../assets/api';

export function Trailer({ id, poster, title, overview, genre, average, part }) {
	const videoKey = [];
	const videos = useQuery({
		queryKey: ['movieVideo', part, id],
		queryFn: () => getVideo(part, id),
	});

	const getGenres = useQuery({
		queryKey: ['genres'],
		queryFn: getGenresList,
	});

	if (videos.status === 'loading') {
		return <h1>Video Loading...</h1>;
	}

	if (videos.status === 'error') {
		return <h1>Error : {videos.error.message}</h1>;
	}

	if (getGenres.status === 'loading') {
		return <h1>Genres Loading...</h1>;
	}

	if (getGenres.status === 'error') {
		return <h1>Error : {getGenres.error.message}</h1>;
	}

	if (!videos.data || !getGenres.data) {
		return <h1>Trailer Loading...</h1>;
	}
	const videoList = videos.data.movieVideo.results;
	videoList.map((video) => {
		if (video.type === 'Trailer') {
			return videoKey.push(video.key);
		}
	});
	const genreList = getGenres.data.genres.genres;

	return (
		<>
			{videoKey.length === 0 ? (
				<img id={id} src={`https://image.tmdb.org/t/p/original/${poster}`} alt="header-image" />
			) : (
				<iframe
					className="w-screen h-screen"
					src={`https://www.youtube.com/embed/${videoKey[0]}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey[0]}`}
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
			)}
			<div className="text-white z-[90] absolute top-[35%] left-[5%] w-1/3">
				<h1 className="font-black text-4xl drop-shadow-2xl mb-3">{title}</h1>
				<div>
					{genreList.map((gl) => {
						if (genre.includes(gl.id)) {
							return (
								<span key={gl.id} className="mr-2 mb-2">
									{gl.name}
								</span>
							);
						}
					})}
				</div>
				<p className="text-2xl mb-3">⭐평점: {average}</p>
				<p className="font-bold text-3xl w-full drop-shadow-2xl line-clamp-3">
					{!overview ? '영화에 대한 소개가 없습니다.' : overview}
				</p>
			</div>
		</>
	);
}
