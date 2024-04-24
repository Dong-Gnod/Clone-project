import Link from 'next/link';

export const MovieList = ({ movies }) => {
	const part = 'movie';
	return (
		<>
			<div className="w-9/12 flex flex-wrap gap-5 justify-center mx-auto">
				{movies.map((movie) => {
					if (!movie.poster_path) return;
					return (
						<Link key={movie.id} href={`detail/${part}/${movie.id}`}>
							<div className="w-48 transition-all duration-300 hover:scale-150">
								<img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster" />
							</div>
						</Link>
					);
				})}
			</div>
			;
		</>
	);
};
