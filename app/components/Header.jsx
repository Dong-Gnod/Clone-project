'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getMovie } from '../assets/api';
import { Trailer } from './Trailer';

export function Header() {
	const { data, isError, error } = useSuspenseQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	const part = 'movie';
	if (isError) {
		return <h1>Error: {error.message}</h1>;
	}

	const orderMovie = data.movieList.results;
	const headerContent = orderMovie[Math.floor(Math.random() * orderMovie.length - 1)];
	if (!headerContent) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<div className="flex justify-center relative w-screen h-screen overflow-hidden">
				<Trailer
					id={headerContent.id}
					poster={headerContent.backdrop_path}
					title={headerContent.title}
					overview={headerContent.overview}
					genre={headerContent.genre_ids}
					average={headerContent.vote_average}
					part={part}
				/>
			</div>
		</>
	);
}
