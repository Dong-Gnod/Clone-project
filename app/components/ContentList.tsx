import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../model/Movies';

interface Content {
	id: string;
	poster_path: string;
}
interface ContentProp {
	category: Movie[];
	part: string;
}

export function ContentList({ category, part }: ContentProp) {
	const contents = !category
		? null
		: category?.filter((item: Movie, i: number) => {
				return (
					category?.findIndex((item1) => {
						return item.id === item1.id;
					}) === i
				);
		  });
	return (
		<>
			{contents?.map((content: Content) => {
				if (!content.poster_path) return;
				return (
					<Link key={content?.id} href={`detail/${part}/${content?.id}`}>
						<div className="w-48 transition-all duration-300 hover:scale-150">
							<Image
								src={`https://image.tmdb.org/t/p/original/${content?.poster_path}`}
								alt="poster"
								width={240}
								height={320}
								priority
							/>
						</div>
					</Link>
				);
			})}
		</>
	);
}
