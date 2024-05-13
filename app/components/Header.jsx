import { Trailer } from './Trailer';
import Loading from './Loading';
import { useAllMovie } from '../hooks/useFetch';

export function Header() {
	const { data, error, isError, isLoading } = useAllMovie();

	const part = 'movie';

	if (isError) {
		return <h1>Error: {error.message}</h1>;
	}

	if (isLoading) {
		return <Loading title={'header'} />;
	}

	const orderMovie = data.movieList.results;
	const Index = Math.floor(Math.random() * orderMovie.length);
	const headerContent = orderMovie[Index];

	return (
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
	);
}
