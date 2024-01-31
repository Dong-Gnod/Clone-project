'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Nav from '../../components/Nav';
import Header from '../../components/Header';
import { Play } from '../../assets/icons';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMovie, getVideo } from '../../assets/api';

export default function Detail(props) {
	const [movie, setMovie] = useState([]);
	const [genres, setGenres] = useState([]);
	const [videos, setVideos] = useState([]);
	const params = useParams();
	const ref = useRef(null);
	const videoKey = [];

	const movies = useQuery({
		queryKey: ['movieList', props.params.id],
		queryFn: getMovie,
	});

	const playVideo = useQuery({
		queryKey: ['movieVideo', props.params.id],
		queryFn: getVideo,
	});

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
		},
	};

	videos.map((video) => {
		if (video.type === 'Trailer') {
			videoKey.push(video.key);
		}
	});
	return (
		<>
			<Nav />
			<div className="w-full h-screen text-black font-semibold font-RobotoMono">
				{/* 이미지 */}
				{movie && (
					<Header
						key={movie.id}
						id={movie.id}
						headerImage={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
						title={movie.title}
					/>
				)}

				<div className="bg-gray-400/50 p-10 rounded-md z-[100] w-2/4 flex justify-center flex-col mx-auto relative bottom-[15%] translate-y-[-60%]">
					<h1 className="text-center text-3xl font-black">{movie.title}</h1>
					<div className="flex justify-between items-center mb-2">
						<div className="flex text-xl w-[100%]">
							<h1>장르:</h1>
							<span className="flex justify-between">
								{genres.map((genre, index) => {
									return (
										<p key={index} className="ml-2">
											{genre.name}
										</p>
									);
								})}
							</span>
						</div>

						{/* 예고편 */}
						<div className=" bg-play w-[20%] items-center p-10 rounded-md">
							<Link
								href={
									videoKey.length === 0
										? `https://www.youtube.com/results?search_query=${movie.title}`
										: `https://www.youtube.com/watch?v=${videoKey[0]}`
								}
								className="flex justify-center top-[50%]">
								<Play />
								<span ref={ref} className="text-black items-center">
									예고편 재생
								</span>
							</Link>
						</div>
					</div>

					{/* 줄거리 */}
					<p>{movie.overview}</p>
				</div>
			</div>
		</>
	);
}
