'use client';

import { useState } from 'react';
import Login from './login/page';
import Signup from './signup/page';

export default function Home() {
	const [startPage, setStartPage] = useState(false);
	return (
		<main className="bg-main">
			<button onClick={() => setStartPage(!startPage)}>로그인</button>
			{!startPage ? <Login /> : <Signup />}
		</main>
	);
}
