'use client';

import { useState } from 'react';
import { SearchIcon } from '../assets/icons';
import Link from 'next/link';

export function Search() {
	const [word, setWord] = useState('');
	let keyword = '';
	keyword = word;
	const inputHandler = (e) => {
		setWord(e.target.value);
	};

	return (
		<>
			<form className="flex items-center">
				<input
					name="search"
					type="text"
					className="h-6 text-black rounded-md"
					value={word}
					onChange={inputHandler}
				/>
				<Link
					href={{
						pathname: '/searchPage',
						query: { content: keyword },
					}}
					className="flex items-center justify-center">
					<button className="ml-2 text-red-600 font-black">
						<SearchIcon />
					</button>
				</Link>
			</form>
		</>
	);
}
