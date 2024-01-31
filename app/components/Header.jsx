'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getVideo } from '../assets/api';

export default function Header({ id, headerImage }) {
	const [video, setVideo] = useState([]);
	const videoKey = [];
	const playVideo = useQuery({
		queryKey: ['movieVideo', id],
		queryFn: getVideo,
	});

	console.log(playVideo.data);

	video.map((v) => {
		if (v.type === 'Trailer') {
			videoKey.push(v.key);
		}
	});
	return (
		<>
			<div className="flex justify-center relative w-screen h-screen overflow-hidden">
				{videoKey.length === 0 ? (
					<img id={id} src={`https://image.tmdb.org/t/p/original/${headerImage}`} alt="header-image" />
				) : (
					<iframe
						src={`https://www.youtube.com/watch?v=${videoKey[0]}`}
						width={100}
						height={100}
						allow="autoplay; fullscreen"></iframe>
				)}
			</div>
		</>
	);
	tvList;
}
