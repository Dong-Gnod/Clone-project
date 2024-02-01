'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getVideo, getMovie } from '../assets/api';
import { Trailer } from './Trailer';

export function Header() {
	const movies = useQuery({
		queryKey: ['movieList'],
		queryFn: getMovie,
	});

	if (movies.status === 'loading') {
		return <h1>Loading...</h1>;
	}
	if (movies.status === 'error') {
		return <h1>Error: {movies.error.message}</h1>;
	}

	if (!movies.data) {
		return <h1>Loading...</h1>;
	}

	const orderMovie = movies.data.movieList.results;
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
				/>
			</div>
		</>
	);
}
