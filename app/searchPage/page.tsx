'use client';

import { Suspense } from 'react';
import Loading from '../components/Loading';
import SearchResult from '../components/SearchResult';

export default function SearchPage() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<div className="flex flex-col justify-center items-center">
					<SearchResult />
				</div>
			</Suspense>
		</>
	);
}
