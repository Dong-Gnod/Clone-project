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
			<form className="flex items-center p-2 rounded-md bg-red-600">
				<input type="text" className=" text-black rounded-md" value={word} onChange={inputHandler} />
				<Link
					href={{
						pathname: '/searchPage',
						query: { content: keyword },
					}}>
					<button className="ml-2">
						<SearchIcon />
					</button>
				</Link>
			</form>
		</>
	);
}
