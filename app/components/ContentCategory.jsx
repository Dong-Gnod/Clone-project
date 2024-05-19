import clsx from 'clsx';

export default function ContentCategory({ part, categories, onCategories }) {
	const movieRoute = [
		{
			id: 'popularMovie',
			name: '인기 영화',
		},
		{
			id: 'nowPlayMovie',
			name: '상영 중인 영화',
		},
		{
			id: 'upcomingMovie',
			name: '상영 예정 영화',
		},
		{
			id: 'topRated',
			name: '평점 순 영화',
		},
	];

	const seriesRoute = [
		{
			id: 'popularTv',
			name: '인기 Tv 프로그램',
		},
		{
			id: 'onTheAir',
			name: '방영 중인 프로그램',
		},
		{
			id: 'airingToday',
			name: '오늘 방영 프로그램',
		},
		{
			id: 'topRatedTv',
			name: '평점 순 프로그램',
		},
	];

	return (
		<>
			{part === 'movie' ? (
				<ul className="flex w-dvw justify-center font-black text-xl">
					{movieRoute.map((category) => {
						return (
							<button
								key={category.id}
								onClick={() => onCategories(category.id)}
								className={`mr-8 pb-2 hover:border-b-4 hover:border-solid hover:border-red-600 ${clsx({
									['border-b-4 border-solid border-red-600']: categories === category.id,
								})}`}>
								<li key={category.id}>{category.name}</li>
							</button>
						);
					})}
				</ul>
			) : (
				<ul className="flex w-dvw justify-center font-black text-xl">
					{seriesRoute.map((category) => {
						return (
							<button
								key={category.id}
								onClick={() => onCategories(category.id)}
								className={`mr-8 pb-2 hover:border-b-4 hover:border-solid hover:border-red-600 ${clsx({
									['border-b-4 border-solid border-red-600']: categories === category.id,
								})}`}>
								<li key={category.id}>{category.name}</li>
							</button>
						);
					})}
				</ul>
			)}
		</>
	);
}
