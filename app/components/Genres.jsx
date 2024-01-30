'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getGenresList } from '../assets/api';

export default function Genres({ movies }) {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['genres'],
		queryFn: getGenresList,
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	const genres = data.genres.genres;

	return (
		<div className="font-RobotoMono">
			{genres.map((genre) => {
				return (
					<div key={genre.id} className={genre.name}>
						<h1 className="ml-2.5 mb-1.5 text-3xl font-bold">
							{document.querySelectorAll(`.${genre.name} .item`).length === 0 ? null : genre.name}
						</h1>
						<ul className="flex flex-wrap mx-auto">
							{movies
								.filter((movie) => {
									return movie.genre_ids.includes(genre.id);
								})
								.map((movie) => {
									return (
										<Link href={`detail/${movie.id}`} key={movie.id}>
											<li className="item mx-auto">
												<div className="w-36 ml-2.5 mb-7">
													<img
														id={movie.id}
														src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
														alt="Image"
													/>
												</div>
											</li>
										</Link>
									);
								})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}
