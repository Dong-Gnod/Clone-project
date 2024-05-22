'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { searchContent } from '../assets/api';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '../components/Loading';

interface Search {
	id: string;
	media_type: string;
	poster_path: string;
}

export default function SearchPage() {
	const searchParams = useSearchParams();
	const keyword = searchParams.get('content');

	const { data, isError, error } = useSuspenseQuery({
		queryKey: ['searchInfo', keyword],
		queryFn: () => searchContent(keyword),
	});

	if (isError) {
		return <h1>Error: {error?.message}</h1>;
	}

	if (!data) return;
	console.log(keyword);
	const searchItem = data.searchInfo.results;
	return (
		<Suspense fallback={<Loading />}>
			<main className="flex flex-col justify-center">
				<div className="w-screen flex flex-col justify-center items-center mt-20">
					<h1 className="text-6xl font-black text-center border-b-2 p-10 w-3/4 mx-auto">{keyword}</h1>
					<div className="w-9/12 flex flex-wrap mt-10 gap-5 justify-center mx-auto">
						{searchItem.length === 0 ? (
							<p className="text-4xl mt-10 text-white">검색한 컨텐츠가 존재하지 않습니다.</p>
						) : (
							searchItem.map((item: Search) => {
								if (!item.poster_path) return;
								return (
									<Link key={item.id} href={`detail/${item.media_type}/${item.id}`}>
										<div key={item.id}>
											<Image
												src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
												alt="search result item"
												width={240}
												height={320}
											/>
										</div>
									</Link>
								);
							})
						)}
					</div>
				</div>
			</main>
		</Suspense>
	);
}
