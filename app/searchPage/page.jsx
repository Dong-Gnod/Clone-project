'use client';

import { useQuery } from '@tanstack/react-query';
import { searchContent } from '../assets/api';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
	const searchParams = useSearchParams();
	const keyword = searchParams.get('content');

	const searchQuery = useQuery({
		queryKey: ['searchInfo', keyword],
		queryFn: () => searchContent(keyword),
	});

	if (searchQuery.status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (searchQuery.status === 'error') {
		return <h1>Error: {searchQuery.error.message}</h1>;
	}

	if (!searchQuery.data) return;
	console.log(keyword);
	const searchItem = searchQuery.data.searchInfo.results;
	return (
		<main className="flex flex-col justify-center">
			<div className="w-2/4 mx-auto">
				<h1 className="text-6xl font-black text-center border-b-2 p-10 w-full">{keyword}</h1>
				<div className="flex justify-evenly mt-7">
					{!searchItem ? (
						<p className="text-9xl text-white">검색한 컨텐츠가 존재하지 않습니다.</p>
					) : (
						searchItem.map((item) => {
							if (!item.poster_path) return;
							return (
								<Link key={item.id} href={`detail/${item.media_type}/${item.id}`}>
									<div key={item.id}>
										<Image
											src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
											alt="search result item"
											width={240}
											height={360}
										/>
									</div>
								</Link>
							);
						})
					)}
				</div>
			</div>
		</main>
	);
}
