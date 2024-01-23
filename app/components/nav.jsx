'use client';

import Image from 'next/image';
import logo from '../../public/logo.png';
import Link from 'next/link';
import { useAuth } from '../store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Nav() {
	const { user, signIn, signOut } = useAuth();
	const router = useRouter();
	useEffect(() => {
		const loggedInUser = JSON.parse(localStorage.getItem('user'));
		if (!loggedInUser) return;
		signIn(loggedInUser);
	}, []);

	return (
		<div className="flex w-full justify-between items-center mt-4 px-14 fixed z-[100] font-RobotoMono">
			<div className="flex mr-1.5 items-center bg-gray-900 px-5 rounded-md">
				<Link href="/main">
					<Image src={logo} alt="Netflix home" className="w-20 h-20" />
				</Link>
				{/* menu */}
				{user && window.location.href !== 'http://localhost:3000' ? (
					<>
						<ul className="text-sm flex justify-between w-full text-sm font-medium">
							<Link href="/main">
								<li className="ml-5 text-sm">홈</li>
							</Link>
							<Link href="/moviePage">
								<li className="ml-5 text-sm">영화</li>
							</Link>
							<Link href="/seriesPage">
								<li className="ml-5 text-sm">시리즈</li>
							</Link>
						</ul>
						<button
							className="text-white w-15 absolute top-[2%] right-[2%]  bg-gray-900/50 p-3 rounded-md"
							onClick={() => {
								signOut();
								localStorage.removeItem('user');
								router.push('/');
							}}>
							LogOut
						</button>
					</>
				) : null}
			</div>
		</div>
	);
}
