import Image from 'next/image';
import Link from 'next/link';

export function ContentList({ category, current }) {
	return (
		<>
			{category[current] &&
				category[current]?.map((movie) => {
					if (!movie.poster_path) return;
					return (
						<Link key={movie.id} href={`detail/movie/${movie.id}`}>
							<div className="w-48 transition-all duration-300 hover:scale-150">
								<Image
									src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
									alt="poster"
									width={240}
									height={320}
								/>
							</div>
						</Link>
					);
				})}
		</>
	);
}
