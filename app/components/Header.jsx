'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getMovie } from '../assets/api';
import { Trailer } from './Trailer';

export function Header() {
	const { data, error, isError } = useSuspenseQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	const part = 'movie';

	if (isError) {
		return <h1>Error: {error.message}</h1>;
	}

	const orderMovie = data.movieList.results;
	const headerIndex = Math.floor(Math.random() * orderMovie.length);
	const headerContent = orderMovie[headerIndex];

	return (
		<div className="flex justify-center relative w-screen h-screen overflow-hidden">
			{headerContent && (
				<Trailer
					id={headerContent.id}
					poster={headerContent.backdrop_path}
					title={headerContent.title}
					overview={headerContent.overview}
					genre={headerContent.genre_ids}
					average={headerContent.vote_average}
					part={part}
				/>
			)}
		</div>
	);
}
