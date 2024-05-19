import Image from 'next/image';
import Link from 'next/link';

export function ContentList({ category, part }) {
	const contents = category.filter((item, i) => {
		return (
			category.findIndex((item1) => {
				return item.id === item1.id;
			}) === i
		);
	});
	return (
		<>
			{contents.map((content) => {
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
