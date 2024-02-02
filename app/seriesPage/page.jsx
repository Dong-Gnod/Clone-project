'use client';

import { useQuery } from '@tanstack/react-query';
import { getTv } from '../assets/api.js';

export default function SeriesPage() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ['tvList'],
		queryFn: getTv,
	});

	if (isPending) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error: {error.message}</span>;
	}

	console.log(data);

	const series = data.tvList.results;
	const headerImage = series[Math.floor(Math.random() * series.length - 1)];

	return (
		<div className="flex flex-col">
			<h1>준비 중</h1>
		</div>
	);
}
