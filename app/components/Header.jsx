'use client';

import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../assets/api';
import { Trailer } from './Trailer';
import Loading from './Loading';

export function Header() {
	const { data, error, isLoading, isError } = useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	const part = 'movie';

	if (isError) {
		return <h1>Error: {error.message}</h1>;
	}

	if (isLoading) {
		return <Loading />;
	}

	const orderMovie = data.movieList.results;
	const headerIndex = Math.floor(Math.random() * orderMovie.length);
	const headerContent = orderMovie[headerIndex];
	console.log(headerContent);

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
