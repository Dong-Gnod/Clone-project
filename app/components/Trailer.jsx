'use client';

import { useQuery } from '@tanstack/react-query';
import { getVideo } from '../assets/api';
import Link from 'next/link';

export function Trailer({ id, poster, title, overview }) {
	const videoKey = [];
	const videos = useQuery({
		queryKey: ['movieVideo', id],
		queryFn: () => getVideo(id),
	});

	if (videos.status === 'loading') {
		return <h1>Video Loading...</h1>;
	}

	if (videos.status === 'error') {
		return <h1>Error : {videos.error.message}</h1>;
	}

	if (!videos.data) {
		return <h1>Trailer Loading...</h1>;
	}
	const videoList = videos.data.movieVideo.results;
	videoList.map((video) => {
		if (video.type === 'Trailer') {
			return videoKey.push(video.key);
		}
	});
	console.log(videoKey);
	return (
		<>
			{videoKey.length === 0 ? (
				<img id={id} src={`https://image.tmdb.org/t/p/original/${poster}`} alt="header-image" />
			) : (
				<iframe
					className="w-screen h-screen"
					src={`https://www.youtube.com/embed/${videoKey[0]}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey[0]}`}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
					allowfullscreen></iframe>
			)}
		</>
	);
}
