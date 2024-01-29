'use client';

import { useEffect, useState } from 'react';

export default function Header({ id, headerImage }) {
	const [video, setVideo] = useState([]);
	const videoKey = [];

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
			},
		};
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=ko-KO&append_to_response=images,videos`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				setVideo(response.videos.results);
			})
			.catch((err) => console.error(err));
	}, []);
	console.log(video);

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
